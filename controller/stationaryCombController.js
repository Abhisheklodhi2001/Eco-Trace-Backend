const Joi = require("joi");
const config = require("../config");
const jwt = require("jsonwebtoken");
const {
  getSelectedData, getSelectedColumn,
  getData, country_check
} = require("../models/common");

const {
  fetchCombustionEmission,
  getStationaryComissionFactorByItemType,
  insertCombustionEmission,
  getCombustionEmission,
  checkCategoryInTemplate
} = require("../models/stationaryCombustion")

const { checkNUllUnD, checkNUllUnDString } = require("../services/helper");


exports.getSubCatSeedData = async (req, res) => {
  try {
    let where = " where id between 1 and 3";
    const seedDataDetails = await getData("subcategoryseeddata", where);
    if (seedDataDetails.length > 0) {
      return res.json({
        success: true,
        message: "Succesfully fetched the batch ids",
        categories: seedDataDetails,
        status: 200,
      });
    } else {
      return res.json({
        success: false,
        message: "Some problem occured while selecting the batch ids",
        status: 500,
      });
    }
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      message: "Internal server error",
      error: err,
      status: 500,
    });
  }
};

exports.getSubCategoryTypes = async (req, res) => {
  try {
    const { id } = req.body;
    const schema = Joi.alternatives(
      Joi.object({
        id: [Joi.number().optional().empty()],
      })
    );
    let where = `where SubCatId = ${id}`;
    const categoryDetails = await getData("subcategorytypes", where);
    if (categoryDetails.length > 0) {
      return res.json({
        success: true,
        message: "Succesfully fetched the categories",
        categories: categoryDetails,
        status: 200,
      });
    } else {
      return res.json({
        success: false,
        message: "Some problem occured while selecting the batch ids",
        status: 500,
      });
    }
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      message: "Internal server error",
      error: err,
      status: 500,
    });
  }
};

exports.stationaryCombustionEmission = async (req, res) => {
  try {
    const { months, year, subCategoryTypeId, SubCategorySeedID, blendType, blendPercent, unit, readingValue, facility_id, calorificValue } = req.body;
    const schema = Joi.alternatives(
      Joi.object({
        months: [Joi.string().required().empty()],
        year: [Joi.string().required().empty()],
        subCategoryTypeId: [Joi.number().required().empty()],
        SubCategorySeedID: [Joi.number().required().empty()],
        blendType: [Joi.string().optional().empty()],
        blendPercent: [Joi.number().optional().empty()],
        unit: [Joi.string().required().empty()],
        readingValue: [Joi.number().required().empty()],
        calorificValue: [Joi.optional().allow("")],
        facility_id: [Joi.number().required().empty()],
        file: [Joi.string().optional()]
      })
    );
    const result = schema.validate(req.body);
    if (result.error) {
      const message = result.error.details.map((i) => i.message).join(",");
      return res.json({
        message: result.error.details[0].message,
        error: message,
        missingParams: result.error.details[0].message,
        status: 200,
        success: false,
      });
    }
    const user_id = req.user.user_id;

    var monthsArr = JSON.parse(months);
    var litreUnit = "litres";
    var kgUnit = "kg";
    var kwhUnit = "kwh";
    var tonnesUnit = "tonnes";
    var emissionFactor = 0;
    var emissionFactor1 = 0;
    let resultInserted = [];
    let calorificValue2 = "";
    if (calorificValue == "null") {
      calorificValue2 = "";
    } else {
      calorificValue2 = calorificValue
    }

    stationaryCombustionData = {
      user_id: user_id,
      readingValue: readingValue,
      BlendType: blendType,
      BlendPercent: blendPercent,
      emission: 0,
      month: "",
      year: year,
      Unit: unit,
      ghgEmissions: 0,
      calorificValue: calorificValue2 ? calorificValue2 : "",
      facility_id: facility_id,
      Scope3GHGEmission: 0,
      FileName: req.file != undefined ? req.file.filename : null
    };

    let countrydata = await country_check(facility_id);
    if (countrydata.length == 0) {
      return res.json({
        success: false,
        message: "EF not Found while Adding heat and steam",
        status: 400,
      });
    }
    const emissionDetails = await fetchCombustionEmission(
      SubCategorySeedID,
      subCategoryTypeId,
      countrydata[0].CountryId
    );

    if (emissionDetails.length > 0) {
      let yearRange = emissionDetails[0]?.Fiscal_Year;
      let [startYear, endYear] = yearRange.split('-').map(Number);
      if (year >= startYear && year <= endYear) {
        stationaryCombustionData.TypeName = emissionDetails[0].Item;
        stationaryCombustionData.TypeId = subCategoryTypeId;
        stationaryCombustionData.SubCategoriesID = SubCategorySeedID;
      } else if (year == startYear) {
        stationaryCombustionData.TypeName = emissionDetails[0].Item;
        stationaryCombustionData.TypeId = subCategoryTypeId;
        stationaryCombustionData.SubCategoriesID = SubCategorySeedID;
      } else {
        return res.json({
          success: false,
          message: "EF not Found for this year",
          status: 400,
        });
      }
    } else {
      return res.json({
        success: false,
        message: "EF not found while adding  stationaryCombustion Emissions",
        status: 400,
      });
    }
    if (unit.toLowerCase() === kgUnit) {
      emissionFactor = emissionDetails[0]?.kgCO2e_kg
      emissionFactor1 = emissionDetails[0]?.scope3_kgCO2e_kg
    }
    else if (unit.toLowerCase() === litreUnit) {
      emissionFactor = emissionDetails[0]?.kgCO2e_litre
      emissionFactor1 = emissionDetails[0]?.scope3_kg_CO2e_litres
    }
    else if (unit.toLowerCase() === kwhUnit) {
      emissionFactor = emissionDetails[0]?.kgCO2e_kwh
      emissionFactor1 = emissionDetails[0]?.scope3_kgCO2e_kwh
    }
    else if (unit.toLowerCase() === tonnesUnit) {
      emissionFactor = emissionDetails[0]?.kgCO2e_tonnes
      emissionFactor1 = emissionDetails[0]?.scope3_kgCO2e_tonnes
    }
    if (stationaryCombustionData.calorificValue) {
      emissionFactor = parseFloat(stationaryCombustionData.calorificValue) * parseFloat(emissionFactor)
      emissionFactor1 = parseFloat(stationaryCombustionData.calorificValue) * parseFloat(emissionFactor1)
    }
    let emsssionvalue = 0;
    let emsssionvalue1 = 0;

    if (emissionDetails[0].Item === "Petrol" && blendType !== "No Blend") {
      let multiplyFactor;
      const getStationaryComissionFactor = await getStationaryComissionFactorByItemType('Bioethanol');
      if (unit.toLowerCase() === kgUnit) {
        multiplyFactor = getStationaryComissionFactor[0]?.kgCO2e_kg
      }
      else if (unit.toLowerCase() === litreUnit) {
        multiplyFactor = getStationaryComissionFactor[0]?.kgCO2e_litre
      }
      else if (unit.toLowerCase() === kwhUnit) {
        multiplyFactor = getStationaryComissionFactor[0]?.kgCO2e_kwh
      }
      else if (unit.toLowerCase() === tonnesUnit) {
        multiplyFactor = getStationaryComissionFactor[0]?.kgCO2e_tonnes
      }
      if (blendType === "Perc. Blend") {
        let percent = parseFloat(blendPercent / 100);
        emsssionvalue = parseFloat((percent * multiplyFactor) + ((1 - percent) * emissionFactor));
        emsssionvalue1 = parseFloat((percent * multiplyFactor) + ((1 - percent) * emissionFactor1));
      }
      else if (blendType === "Average Blend") {
        emsssionvalue = parseFloat((0.07 * multiplyFactor) + ((1 - 0.07) * emissionFactor));
        emsssionvalue1 = parseFloat((0.07 * multiplyFactor) + ((1 - 0.07) * emissionFactor1));
      }
    } else if (emissionDetails[0].Item === "Diesel" && blendType !== "No Blend") {
      let multiplyFactor;
      const getStationaryComissionFactor = await getStationaryComissionFactorByItemType('Biodiesel ME');
      if (unit.toLowerCase() === kgUnit) {
        multiplyFactor = getStationaryComissionFactor[0]?.kgCO2e_kg
      }
      else if (unit.toLowerCase() === litreUnit) {
        multiplyFactor = getStationaryComissionFactor[0]?.kgCO2e_litre
      }
      else if (unit.toLowerCase() === kwhUnit) {
        multiplyFactor = getStationaryComissionFactor[0]?.kgCO2e_kwh
      }
      else if (unit.toLowerCase() === tonnesUnit) {
        multiplyFactor = getStationaryComissionFactor[0]?.kgCO2e_tonnes
      }
      if (blendType === "Perc. Blend") {
        let percent = parseFloat(blendPercent / 100);
        emsssionvalue = parseFloat((percent * multiplyFactor) + ((1 - percent) * emissionFactor));
        emsssionvalue1 = parseFloat((percent * multiplyFactor) + ((1 - percent) * emissionFactor1));
      }
      else if (blendType === "Average Blend") {
        emsssionvalue = parseFloat((0.07 * multiplyFactor) + ((1 - 0.07) * emissionFactor));
        emsssionvalue1 = parseFloat((0.07 * multiplyFactor) + ((1 - 0.07) * emissionFactor1));
      }
    } else {
      emsssionvalue = emissionFactor;
      emsssionvalue1 = emissionFactor1;
    }

    stationaryCombustionData.ghgEmissionFactor = emsssionvalue;
    stationaryCombustionData.Scope3GHGEmissionFactor = emsssionvalue1;
    stationaryCombustionData.ghgEmissions = parseFloat(readingValue * emsssionvalue);
    stationaryCombustionData.Scope3GHGEmission = emsssionvalue1 ? parseFloat(readingValue * emsssionvalue1) : 0.00;

    // stationaryCombustionData.ghgEmissions = (Math.round(stationaryCombustionData.ghgEmissions) / 10000)
    const checkRes = await checkCategoryInTemplate(facility_id);
    if ((checkRes[0]?.count !== 1)) {
      stationaryCombustionData.Scope3GHGEmission = 0;
    }

    for (let month of monthsArr) {
      stationaryCombustionData.month = month;
      var tempInserted = await insertCombustionEmission(stationaryCombustionData);
      resultInserted.push(tempInserted.insertId);
    }
    //Check Vehicle Data as well
    if (resultInserted.length > 0) {
      return res.json({
        success: true,
        message: "Succesfully generated Waste  stationaryCombustion Emissions",
        stationaryCombustionData: stationaryCombustionData,
        insertIds: resultInserted,
        status: 200,
      });
    } else {
      return res.json({
        success: false,
        message: "Node data found for this user's  stationaryCombustion Emissions",
        status: 500,
      });
    }
  }
  catch (err) {
    console.log(err);
    return res.json({
      success: false,
      message: "Internal server error",
      error: err,
      status: 500,
    });
  }
};

exports.getStationaryCombEmission = async (req, res) => {
  try {
    const user_id = req.user.user_id;

    const staCombEmissionDetails = await getCombustionEmission(user_id);
    if (staCombEmissionDetails.length > 0) {
      return res.json({
        success: true,
        message: "Succesfully fetched the Stationary combustion Emissions",
        categories: staCombEmissionDetails,
        status: 200,
      });
    } else {
      return res.json({
        success: false,
        message: "No data found for this user",
        status: 500,
      });
    }
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      message: "Internal server error",
      error: err,
      status: 500,
    });
  }
};

exports.getStationaryCombEmissionByTypeId = async (req, res) => {
  try {
    const { TypeID } = req.body;
    const schema = Joi.alternatives(
      Joi.object({
        TypeID: [Joi.string().required().empty()],
      })
    );
    const result = schema.validate(req.body);
    if (result.error) {
      const message = result.error.details.map((i) => i.message).join(",");
      return res.json({
        message: result.error.details[0].message,
        error: message,
        missingParams: result.error.details[0].message,
        status: 200,
        success: false,
      });
    }
    const user_id = req.user.user_id;

    let where = ` where  A.user_id ='` + user_id + `' and  A.TypeID = '${TypeID}'`;
    const staCombEmissionDetails = await getSelectedColumn("stationarycombustionde A ", where, "A.*");

    if (staCombEmissionDetails.length > 0) {
      return res.json({
        success: true,
        message: "Succesfully fetched the Stationary combustion Emissions",
        categories: staCombEmissionDetails,
        status: 200,
      });
    } else {
      return res.json({
        success: false,
        message: "No data found for this user",
        status: 500,
      });
    }
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      message: "Internal server error",
      error: err,
      status: 500,
    });
  }
};
