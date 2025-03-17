
const Joi = require("joi");

const { getCombustionEmission, Allrefrigerants, Allfireextinguisher, getAllcompanyownedvehicles, getAllelectricity, getAllheatandsteam, purchaseGoodsDetails, flight_travelDetails, hotel_stayDetails, other_modes_of_transportDetails, processing_of_sold_products_categoryDetails, sold_product_categoryDetails, endoflife_waste_typeDetails, water_supply_treatment_categoryDetails, employee_commuting_categoryDetails, homeoffice_categoryDetails, waste_generated_emissionsDetails, upstreamLease_emissionDetails, downstreamLease_emissionDetails, franchise_categories_emissionDetails, investment_emissionsDetails, upstream_vehicle_storage_emissions, downstream_vehicle_storage_emissions, waste_generated_emissionsDetailsEmssion, waste_generated_emissionsDetailsEmssionByMethodemission } = require("../models/ghgEmissionReport");

exports.GhgScopewiseEmssion = async (req, res) => {
    try {
        const { facilities, year } = req.body;
        const schema = Joi.alternatives(
            Joi.object({
                facilities: [Joi.string().empty().required()],
                year: [Joi.string().empty().required()],
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
                success: true,
            });
        } else {
            let month = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "July",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ];
            let monthlyData = {};
            let monthlyData1 = {};
            let monthlyData2 = {};
            month.forEach((month) => {
                monthlyData[month] = 0;
                monthlyData1[month] = 0;
                monthlyData2[month] = 0;
            });
            let categoryTotals = {};
            let categoryTotals2 = {};
            let categoryTotals3 = {};
            let array1 = [];
            let array2 = [];
            let array3 = [];

            let categorydata, categorydata2, categorydata3, categorydata4, categorydata5, categorydata6, categorydata7, categorydata8, categorydata9, categorydata10, categorydata11, categorydata12, categorydata13, categorydata14, categorydata15, categorydata16, categorydata17, categorydata18, categorydata19, categorydata20, categorydata21 = "";
            let sum = 0;
            let sum1 = 0;
            let sum2 = 0;
            if (facilities) {
                let facilitiesdata = facilities !== "0" ? facilities : "0";
                categorydata = await getCombustionEmission(facilitiesdata, year);
                categorydata2 = await Allrefrigerants(facilitiesdata, year);
                categorydata3 = await Allfireextinguisher(facilitiesdata, year);
                categorydata4 = await getAllcompanyownedvehicles(facilitiesdata, year);
                array1 = [
                    ...categorydata,
                    ...categorydata2,
                    ...categorydata3,
                    ...categorydata4,
                ];
                if (array1.length > 0) {
                    await Promise.all(
                        array1.map(async (item) => {
                            if (item.month_number &&
                                monthlyData.hasOwnProperty(item.month_number)) {
                                let category = item.category;
                                if (!categoryTotals[category]) {
                                    categoryTotals[category] = 0;
                                }
                                categoryTotals[category] += parseFloat(item.emission);
                            }
                        })
                    );
                }
                const resultArray = Object.keys(categoryTotals).map((category) => ({
                    emission: parseFloat(categoryTotals[category].toFixed(1)),
                    category,
                    scope: "scope1",
                }));

                categorydata5 = await getAllelectricity(facilitiesdata, year);
                categorydata6 = await getAllheatandsteam(facilitiesdata, year);
                array2 = [...categorydata5, ...categorydata6];
                if (array2) {
                    await Promise.all(
                        array2.map(async (item) => {
                            if (item.month_number &&
                                monthlyData1.hasOwnProperty(item.month_number)) {
                                let category = item.category;
                                if (!categoryTotals2[category]) {
                                    categoryTotals2[category] = 0;
                                }
                                categoryTotals2[category] += parseFloat(item.emission);
                            }
                        })
                    );
                }
                const resultArray1 = Object.keys(categoryTotals2).map((category) => ({
                    emission: parseFloat(categoryTotals2[category].toFixed(1)),
                    category,
                    scope: "scope2",
                }));

                categorydata7 = await purchaseGoodsDetails(facilitiesdata, year);
                categorydata8 = await flight_travelDetails(facilitiesdata, year);
                let hotelstayDetails = await hotel_stayDetails(facilitiesdata, year);
                let othermodes_of_transportDetails = await other_modes_of_transportDetails(facilitiesdata, year);

                categorydata9 = await processing_of_sold_products_categoryDetails(
                    facilitiesdata,
                    year
                );
                categorydata10 = await sold_product_categoryDetails(
                    facilitiesdata,
                    year
                );
                categorydata11 = await endoflife_waste_typeDetails(
                    facilitiesdata,
                    year
                );
                categorydata12 = await water_supply_treatment_categoryDetails(
                    facilitiesdata,
                    year
                );

                categorydata13 = await employee_commuting_categoryDetails(
                    facilitiesdata,
                    year
                );
                categorydata14 = await homeoffice_categoryDetails(facilitiesdata, year);
                categorydata15 = await waste_generated_emissionsDetails(
                    facilitiesdata,
                    year
                );

                categorydata16 = await upstreamLease_emissionDetails(
                    facilitiesdata,
                    year
                );
                categorydata17 = await downstreamLease_emissionDetails(
                    facilitiesdata,
                    year
                );
                categorydata18 = await franchise_categories_emissionDetails(
                    facilitiesdata,
                    year
                );
                categorydata19 = await investment_emissionsDetails(
                    facilitiesdata,
                    year
                );

                categorydata20 = await upstream_vehicle_storage_emissions(
                    facilitiesdata,
                    year
                );
                categorydata21 = await downstream_vehicle_storage_emissions(
                    facilitiesdata,
                    year
                );
                array3 = [
                    ...categorydata7,
                    ...categorydata8,
                    ...hotelstayDetails,
                    ...othermodes_of_transportDetails,
                    ...categorydata9,
                    ...categorydata10,
                    ...categorydata11,
                    ...categorydata11,
                    ...categorydata12,
                    ...categorydata13,
                    ...categorydata14,
                    ...categorydata15,
                    ...categorydata16,
                    ...categorydata17,
                    ...categorydata18,
                    ...categorydata19,
                    ...categorydata20,
                    ...categorydata21,
                ];
                if (array3) {
                    await Promise.all(
                        array3.map(async (item) => {
                            if (item.month_number &&
                                monthlyData2.hasOwnProperty(item.month_number)) {
                                let category = item.category;
                                if (!categoryTotals3[category]) {
                                    categoryTotals3[category] = 0;
                                }
                                let emssion = parseFloat(item.emission);
                                categoryTotals3[category] += emssion;
                            }
                        })
                    );
                }
                if (categorydata.length > 0) {
                    for (item of categorydata) {
                        if (item.month_number &&
                            monthlyData2.hasOwnProperty(item.month_number)) {
                            monthlyData2[item.month_number] += parseFloat(
                                item?.scope3_emission ? item?.scope3_emission : 0
                            );
                            let emissionFixed = parseFloat(
                                item?.scope3_emission ? item?.scope3_emission : 0
                            );

                            let category = item.category;
                            if (!categoryTotals3[category]) {
                                categoryTotals3[category] = 0;
                            }
                            categoryTotals3[category] += emissionFixed;
                        }
                    }
                }

                const resultArray2 = Object.keys(categoryTotals3).map((category) => ({
                    emission: parseFloat(categoryTotals3[category].toFixed(1)),
                    category,
                    scope: "scope3",
                }));

                let newDAta = [];
                let newDAta2 = [];
                let newDAta3 = [];
                for (let category in categoryTotals) {
                    newDAta.push(
                        `${category} - ${parseFloat(
                            categoryTotals[category] / 1000
                        ).toFixed(3)} Tonnes`
                    );
                }
                for (let category in categoryTotals2) {
                    newDAta2.push(
                        `${category} - ${parseFloat(
                            categoryTotals2[category] / 1000
                        ).toFixed(3)} Tonnes`
                    );
                }

                for (let category in categoryTotals3) {
                    newDAta3.push(
                        `${category} - ${parseFloat(
                            categoryTotals3[category] / 1000
                        ).toFixed(3)} Tonnes`
                    );
                }

                const totalScope1Emission = resultArray.reduce((sum, item) => sum + item.emission, 0);
                const updatedScope1Data = [{ total_emission: totalScope1Emission }, ...resultArray];

                const totalScope2Emission = resultArray1.reduce((sum, item) => sum + item.emission, 0);
                const updatedScope2Data = [{ total_emission: totalScope2Emission }, ...resultArray1];

                const totalScope3Emission = resultArray2.reduce((sum, item) => sum + item.emission, 0);
                const updatedScope3Data = [{ total_emission: totalScope3Emission }, ...resultArray2];

                return res.json({
                    success: true,
                    message: "Succesfully fetched category",
                    Scope1: updatedScope1Data,
                    Scope2: updatedScope2Data,
                    Scope3: updatedScope3Data,
                    seriesScope1: Object.values(categoryTotals).map((num) => parseFloat(num.toFixed(1) / 1000)
                    ),
                    labelScope1: newDAta,
                    seriesScope2: Object.values(categoryTotals2).map((num) => parseFloat(num.toFixed(1) / 1000)
                    ),
                    labelScope2: newDAta2,
                    seriesScope3: Object.values(categoryTotals3).map((num) => parseFloat(num.toFixed(1) / 1000)
                    ),
                    labelScope3: newDAta3,
                    status: 200,
                });
            }
        }
    } catch (err) {
        console.log(err);
        return res.json({
            success: false,
            message: "Internal server error " + err.message,
            error: err,
            status: 500,
        });
    }
};

exports.GhgdashboardWasteTotal = async (req, res) => {
    try {
        const { facilities, year } = req.body;
        const schema = Joi.alternatives(
            Joi.object({
                facilities: [Joi.string().empty().required()],
                year: [Joi.string().empty().required()],
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
                success: true,
            });
        } else {
            let categorydata15 = "";
            let sum1 = 0;
            let sum2 = 0;
            let sum_quantity = 0;
            let sum_quantity2 = 0;
            let sum_quantity3 = 0;
            if (facilities) {
                let facilitiesdata = facilities !== "0" ? facilities : "0";

                categorydata15 = await waste_generated_emissionsDetailsEmssion(
                    facilitiesdata,
                    year
                );
                let unit = "";
                if (categorydata15) {
                    await Promise.all(
                        categorydata15.map(async (item) => {
                            let total_waste = parseFloat(item.total_waste);
                            let emission = parseFloat(item.emission / 1000);
                            unit = item.unit;
                            sum1 += total_waste;

                            if (item.method == "reuse") {
                                let total_waste = parseFloat(item.total_waste);
                                sum_quantity += total_waste;
                            }

                            if (item.method == "composting") {
                                let total_waste = parseFloat(item.total_waste);
                                sum_quantity2 += total_waste;
                            }

                            if (item.method == "recycling") {
                                let total_waste = parseFloat(item.total_waste);
                                sum_quantity3 += total_waste;
                            }
                            sum2 += emission;
                        })
                    );
                }

                let waste1 =
                    await waste_generated_emissionsDetailsEmssionByMethodemission(
                        facilitiesdata,
                        year,
                        "reuse"
                    );

                let waste2 =
                    await waste_generated_emissionsDetailsEmssionByMethodemission(
                        facilitiesdata,
                        year,
                        "composting"
                    );

                let waste3 =
                    await waste_generated_emissionsDetailsEmssionByMethodemission(
                        facilitiesdata,
                        year,
                        "recycling"
                    );

                let sumreuse = waste1[0]?.["emission"]
                    ? parseFloat(waste1[0]["emission"] / 1000)
                    : 0;

                let sumcomposted = waste2[0]?.["emission"]
                    ? parseFloat(waste2[0]["emission"] / 1000)
                    : 0;

                let recycling = waste3[0]?.["emission"]
                    ? parseFloat(waste3[0]["emission"] / 1000)
                    : 0;

                let array3 = [];

                array3.push(sumreuse, sumcomposted, recycling);

                const sumtotal3 = array3.reduce((acc, curr) => acc + curr, 0);

                let totalsum = parseFloat(sum1).toFixed(1);

                let diverted =
                    (parseFloat(sum_quantity + sum_quantity2 + sum_quantity3) /
                        parseFloat(sum1)) *
                    100;

                let diverted_emssion = diverted;

                let totalsum1 = parseFloat(sum2).toFixed(4);

                return res.json({
                    success: true,
                    message: "Succesfully fetched category",
                    waste_disposed: parseFloat(totalsum) + " " + unit,
                    waste_emissions: parseFloat(totalsum1) + " " + "Tonnes",
                    diverted_emssion:
                        parseFloat(diverted_emssion ? diverted_emssion : 0).toFixed(2) +
                        " " +
                        "%",
                    status: 200,
                });
            }
        }
    } catch (err) {
        console.log(err);
        return res.json({
            success: false,
            message: "Internal server error " + err.message,
            error: err,
            status: 500,
        });
    }
};