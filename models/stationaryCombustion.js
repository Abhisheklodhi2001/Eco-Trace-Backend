const db = require("../utils/database");
const config = require("../config");
const baseurl = config.base_url;

module.exports = {
  fetchCombustionEmission: async (seed_id, type_id, country_id) => {
    return db.query(`select *  from stationarycombustion where  SubCategorySeedID= ? and SubCatTypeID= ? and country_id = ?`, [seed_id, type_id, country_id]);
  },

  getStationaryComissionFactorByItemType: async (type) => {
    return await db.query('select *  from stationarycombustion WHERE ItemType = ?', [type])
  },

  checkCategoryInTemplate: async (facilityId) => {
    return db.query(`select C.CatName as catName, count(*) as count   \
                    from \`dbo.managedatapointcategory\` MDS,  \`dbo.categoryseeddata\` C, \`dbo.managedatapoint\` MDP  \
                    where MDS.ManageDataPointCategorySeedID = C.Id  and  MDS.ManageDataPointId = MDP.ID and MDP.FacilityId = ${facilityId} and C.CatName = 'Fuel and Energy-related Activities' LIMIT 1`);
  },

  insertCombustionEmission: async (data) => {
    return db.query(
      "INSERT INTO   `stationarycombustionde` (user_id, ReadingValue, Unit, Status, Year, Month, GHGEmission, GHGEmissionFactor, BlendType, BlendPercent, CalorificValue, TypeName,TypeID, SubCategoriesID,CreatedBy,facility_id, Scope3GHGEmission, Scope3GHGEmissionFactor, FileName) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        data.user_id,
        data.readingValue,
        data.Unit,
        "P",
        data.year,
        data.month,
        data.ghgEmissions,
        data.ghgEmissionFactor,
        data.BlendType,
        data.BlendPercent,
        data.calorificValue,
        data.TypeName,
        data.TypeId,
        data.SubCategoriesID,
        data.user_id,
        data.facility_id,
        data.Scope3GHGEmission,
        data.Scope3GHGEmissionFactor,
        data.FileName
      ]
    );
  },

  getCombustionEmission: async (user_id) => {
    return db.query(`select ReadingValue,Unit,Status,Year,Month,GHGEmission,BlendType,BlendPercent,user_id,TypeName,CalorificValue from stationarycombustionde where  user_id= ?`, [user_id]);
  },

};
