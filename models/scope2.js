const db = require("../utils/database");
const config = require("../config");
const baseurl = config.base_url;

module.exports = {

Addelectricityde: async (data) => {
  return db.query("insert into `dbo.renewableelectricityde`  set ?", [data]);
},

getelectricityef: async (SubCategorySeedID,RegionID,country_id) => {
  let where = "";
  if(RegionID){
    where  =  ` and RegionID = '${RegionID}'`;
  }
  return db.query("select * from `dbo.electricity` where  SubCategorySeedID =? and country_id=? "+where,[SubCategorySeedID ,country_id]);
 },


 getelectricityefScop3: async (SubCategorySeedID,country_id) => {
  let where = "";
  if(SubCategorySeedID){
    where  =  ` and SubCategorySeedID = '${SubCategorySeedID}'`;
  }
  return db.query("select * from `dbo.electricity` where  item = 'T&D - Electricity' and  is_scope3 = '1' and country_id=? "+where,[country_id]);
 },


Addheatandsteam: async (data) => {
  return db.query("insert into `dbo.heatandsteamde`  set ?", [data]);
},

getheatandsteam: async (SubCategorySeedID,country_id) => {

  return db.query("select * from `dbo.heatandsteam` where  SubCategorySeedID =? and country_id=?",[SubCategorySeedID,country_id]);
 },
 //Addheatandsteam

 checkCategoryInTemplate: async (facilityId) => {

  return db.query(`select C.CatName as catName, count(*) as count   \
                  from \`dbo.managedatapointcategory\` MDS,  \`dbo.categoryseeddata\` C, \`dbo.managedatapoint\` MDP  \
                  where MDS.ManageDataPointCategorySeedID = C.Id  and  MDS.ManageDataPointId = MDP.ID and MDP.FacilityId = ${facilityId} and C.CatName = 'Fuel and Energy-related Activities' LIMIT 1`);
 },
}
