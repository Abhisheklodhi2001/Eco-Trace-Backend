const db = require("../utils/database");
const config = require("../config");
const baseurl = config.base_url;

module.exports = {
  Addassignedmanagedatapoint: async (data) => {
    return db.query("insert into `dbo.managedatapoint`  set ?", [data]);
  },

  AddassignedDataPointbyfacility: async (data) => {
    return db.query("insert into `dbo.managedatapointcategory`  set ?", [data]);
  },

  Addmanagedatapointcategory: async (data) => {
    return db.query("insert into `dbo.managedatapointcategory`  set ?", [data]);
  },

  Addmanagedatapointsubcategory: async (data) => {
    return db.query("insert into `dbo.managedatapointsubcategory`  set ?", [data]);
  },

  AddstationarycombustionLiquid: async (data) => {
    return db.query("insert into `stationarycombustionde`  set ?", [data]);
  },

  Addrefrigerant: async (data) => {
    return db.query("insert into `dbo.refrigerantde`  set ?", [data]);
  },

  getrefrigerant: async (item, country_id) => {
    return db.query("select * from `dbo.refrigents`  where subCatTypeID=? and country_id = ? ", [item, country_id]);
  },

  Allrefrigerants: async (user_id) => {
    return db.query("select A.*,B.item,B.kgCO2e_kg from `dbo.refrigerantde` A LEFT JOIN `dbo.refrigents` B ON B.ID = A.subCategoryTypeId where A.user_id=?", [user_id]);
  },

  Allfireextinguisher: async (user_id) => {
    return db.query("select A.*,B.item,B.kgCO2e_kg from `dbo.fireextinguisherde` A LEFT JOIN `dbo.fireextinguisher` B ON B.ID = A.subCategoryTypeId where A.user_id=?", [user_id]);
  },

  Addfireextinguisher: async (data) => {
    return db.query("insert into  `dbo.fireextinguisherde`  set ?", [data]);
  },

  getfireextinguisher: async (item, country_id) => {
    return db.query("select * from `dbo.fireextinguisher`  where SubCategorySeedID=?", [item, country_id]);
  },

  getpassengervehicletypes: async (country_id) => {
    return await db.query('SELECT ID, Item, ItemType AS VehicleType FROM `companyownedvehicles` WHERE country_id = "' + country_id + '" AND SubCategorySeedID = 10;');
  },

  getdeliveryvehicletypesWithCountryId: async (country_id) => {
    return db.query('select * from `dbo.deliveryvehicletypes` where vehicletypes_id < 4  AND country_id = "' + country_id + '"');
  },

  getdeliveryvehicletypes: async (country_id) => {
    return await db.query('SELECT ID, Item, ItemType AS VehicleType FROM `companyownedvehicles` WHERE country_id = "' + country_id + '" AND SubCategorySeedID = 11;');
  },

  getelectricity: async (id, CountryId) => {
    return db.query('select *,SubCategorySeedID as subCatTypeID from `dbo.electricity` where SubCategorySeedID = "' + id + '" AND country_id = "' + CountryId + '"');
  },


  getRenewableelectricity: async (id, CountryId) => {
    return db.query('select *,SubCategorySeedID as subCatTypeID from `dbo.electricity` where SubCategorySeedID = "' + id + '" AND country_id = "' + CountryId + '"');
  },


  getheatandsteam: async (id, CountryId) => {
    return db.query('select * from `dbo.heatandsteam` where SubCategorySeedID = "' + id + '" AND country_id = "' + CountryId + '"');
  },

  Addcompanyownedvehicles: async (data) => {
    return db.query("insert into  `dbo.vehiclede`  set ?", [data]);
  },

  getvehicletypesByName: async (VehicleTypeID, SubCategorySeedID, facilityId) => {
    const categoryValue = SubCategorySeedID == 10 ? 1 : 2;
    return db.query("SELECT tbl_vehicle_fleet.company_owned_vehicle_id AS vehicle_type_id, companyownedvehicles.* FROM `tbl_vehicle_fleet` LEFT JOIN companyownedvehicles ON companyownedvehicles.ID = tbl_vehicle_fleet.company_owned_vehicle_id WHERE tbl_vehicle_fleet.vehicle_model = ? AND tbl_vehicle_fleet.category = ? AND tbl_vehicle_fleet.facility_id = ?", [VehicleTypeID, categoryValue, facilityId]);
  },

  getvehicletypes: async (VehicleTypeID, SubCategorySeedID, country_id) => {
    return db.query("select * from `companyownedvehicles` where ID = ? and SubCategorySeedID = ? and country_id = ?", [VehicleTypeID, SubCategorySeedID, country_id]);
  },

  getAllcompanyownedvehicles: async (user_id, ModeofDEID) => {
    var join = "";
    if (ModeofDEID == 1) {
      join = ' LEFT JOIN  `dbo.passengervehicletypes` B ON A.VehicleTypeID = B.ID';
    } else {
      join = ' LEFT JOIN  `dbo.passengervehicletypes` B ON A.VehicleTypeID = B.ID';
    }
    return db.query('select A.*,B.VehicleType from `dbo.vehiclede` A  ' + join + ' where  A.user_id = ?', [user_id]);
  },

  getpassengervehicletypesById: async (id) => {
    return db.query("select * from `dbo.passengervehicletypes` where id=? ", [id]);
  },

}
