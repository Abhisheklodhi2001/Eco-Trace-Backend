const db = require("../utils/database");
const config = require("../config");
const baseurl = config.base_url;

module.exports = {
  fetchUserById: async (id) => {
    return db.query(" select * from aspnetusers where id= ?", [id]);
  },
  fetchUserByEmail: async (email) => {
    return db.query("select * from aspnetusers where Email = ?", [email]);
  },
  fetchVehicleId: async (vehicle_type) => {
    return db.query("select id from vehicletypes where vehicle_type = ?", [
      vehicle_type,
    ]);
  },
  fetchVehicleEmission: async (vehicle_id, vehicle_type,country_id) => {
    return db.query(
      "select * from vehicle_subcategory where vehicle_category_id = ? and vehicle_type = ? and country_id = ?",
      [vehicle_id, vehicle_type,country_id]
    );
  },

  insertDownStreamVehicleStorageEmission: async (data) => {
    return db.query(
      "INSERT INTO   `downstream_vehicle_storage_emissions` (vehicle_type, sub_category,no_of_vehicles,mass_of_product_trans,distance_travelled_km,emission,emission_storage,user_id,status,storage_facility_type,area_occupied,avg_no_of_days,facility_id,month,year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        data.vehicleType,
        data.subCategory,
        data.noOfVehicles,
        data.massOfProducts,
        data.distanceInKms,
        data.emissionVehicle,
        data.emissionStorage,
        data.userId,
        data.status,
        data.storageFType,
        data.areaOccupied,
        data.averageNoOfDays,
        data.facility_id,
        data.month,
        data.year,
      ]
    );
  },
  insertUpStreamVehicleStorageEmission: async (data) => {
    return db.query(
      "INSERT INTO   `upstream_vehicle_storage_emissions` (vehicle_type, sub_category,no_of_vehicles,mass_of_product_trans,distance_travelled_km,emission,emission_storage,user_id,status,storage_facility_type,area_occupied,avg_no_of_days, facility_id,month,year) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        data.vehicleType,
        data.subCategory,
        data.noOfVehicles,
        data.massOfProducts,
        data.distanceInKms,
        data.emissionVehicle,
        data.emissionStorage,
        data.userId,
        data.status,
        data.storageFType,
        data.areaOccupied,
        data.averageNoOfDays,
        data.facility_id,
        data.month,
        data.year,
      ]
    );
  },
  updateEmissionStatus: async (id, emission, status) => {
    return db.query(
      "update purchase_goods_categories set emission=? , status = ? where id= ?",
      [emission, status, id]
    );
  },
  
};
