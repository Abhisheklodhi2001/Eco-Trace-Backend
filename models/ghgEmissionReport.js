const db = require("../utils/database");

module.exports = {
    getCombustionEmission: async (facilities, year, finalyeardata) => {
        let where = "";
        let year1 = parseInt(year) + 1;
        where = ` where  A.Year = '${year}'  and Status = 'S' `;

        if (facilities != '0') {
            where += `  and A.facility_id IN (${facilities})`
        }

        if (finalyeardata == '2') {
            where += ` and  A.Month IN ("Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar") and  A.Month !="" GROUP BY A.Month`

        } else {
            where += ` and  A.Month IN ("Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec") and  A.Month !="" GROUP BY A.Month`
        }


        return db.query(`select SUM(A.GHGEmission) as emission, SUM(A.Scope3GHGEmission) as scope3_emission, COALESCE('Stationary Combustion', '')  as  category ,A.Month AS month_number from stationarycombustionde A ${where}`);
    },

    Allrefrigerants: async (facilities, year, finalyeardata) => {
        let where = "";
        where = ` where  A.Year = '${year}' and Status = 'S'`;
        if (facilities != '0') {
            where += `  and  A.facilities IN (${facilities})`
        }
        if (finalyeardata == '2') {
            where += ` and  A.months IN ("Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar") and  A.months !="" GROUP BY A.months`
        } else {
            where += ` and  A.months IN ("Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec") and  A.months !="" GROUP BY A.months`
        }

        return db.query("select  SUM(A.GHGEmission) as emission,A.months AS month_number,COALESCE('Refrigerants', '')  as  category   from `dbo.refrigerantde` A " + where);
    },

    Allfireextinguisher: async (facilities, year, finalyeardata) => {
        let where = "";
        where = ` where  A.Year = '${year}' and Status = 'S'`;
        if (facilities != '0') {
            where += `  and  A.facilities IN (${facilities})`
        }
        if (finalyeardata == '2') {
            where += ` and  A.months IN ("Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar") and  A.months !="" GROUP BY A.months`
        } else {
            where += ` and  A.months IN ("Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec") and  A.months !="" GROUP BY A.months`
        }
        return db.query("select  SUM(A.GHGEmission) as emission,A.months AS month_number,COALESCE('Fire Extinguisher', '')  as  category    from `dbo.fireextinguisherde` A " + where);
    },

    getAllcompanyownedvehicles: async (facilities, year, finalyeardata) => {
        let where = "";
        where = ` where  A.Year = '${year}' and Status = 'S'`;
        if (facilities != '0') {
            where += `  and  A.facilities IN (${facilities})`
        }
        if (finalyeardata == '2') {
            where += ` and  A.months IN ("Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar") and  A.months !="" GROUP BY A.months`
        } else {
            where += ` and  A.months IN ("Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec") and  A.months !="" GROUP BY A.months`
        }
        return db.query("select  SUM(A.GHGEmission) as emission,A.months AS month_number,COALESCE('Company Owned Vehicles', '')  as  category    from `dbo.vehiclede` A  " + where);
    },

    getAllelectricity: async (facilities, year, finalyeardata) => {
        let where = "";
        where = ` where  A.Year = '${year}' and Status = 'S'`;
        if (facilities != '0') {
            where += `  and  A.facilities IN (${facilities})`
        }
        if (finalyeardata == '2') {
            where += ` and  A.months IN ("Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar") and  A.months !="" GROUP BY A.months`
        } else {
            where += ` and  A.months IN ("Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec") and  A.months !="" GROUP BY A.months`
        }
        return db.query("select SUM(A.GHGEmission) as emission,A.months AS month_number,COALESCE('Electricity', '')  as  category   from `dbo.renewableelectricityde` A " + where);
    },

    getAllheatandsteam: async (facilities, year, finalyeardata) => {
        let where = "";
        where = ` where  A.Year = '${year}' and Status = 'S'`;
        if (facilities != '0') {
            where += `  and  A.facilities IN (${facilities})`
        }
        if (finalyeardata == '2') {
            where += ` and  A.months IN ("Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar") and  A.months !="" GROUP BY A.months`
        } else {
            where += ` and  A.months IN ("Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec") and  A.months !="" GROUP BY A.months`
        }
        return db.query("select  SUM(A.GHGEmission) as emission,A.months AS month_number,COALESCE('Heat and Steam', '')  as  category  from `dbo.heatandsteamde` A " + where);
    },

    purchaseGoodsDetails: async (facilities, year, finalyeardata) => {
        let where = "";
        where = ` where  A.year = '${year}'  and status = 'S'`;
        if (facilities != '0') {
            where += `  and  A.facilities IN (${facilities})` //
        }
        if (finalyeardata == '2') {
            where += ` and  A.month IN ("Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar") and  A.month !="" GROUP BY A.month`
        } else {
            where += ` and  A.month IN ("Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec") and  A.month !="" GROUP BY A.month`
        }
        return db.query("select SUM(A.emission) as emission,A.month AS month_number,COALESCE('Purchased goods and services', '')  as  category from purchase_goods_categories A " + where);
    },

    flight_travelDetails: async (facilities, year, finalyeardata) => {
        let where = "";
        where = ` where  A.year = '${year}' and status = 'S'`;
        if (facilities != '0') {
            where += `  and  A.facilities IN (${facilities})`
        }
        if (finalyeardata == '2') {
            where += ` and  A.month IN ("Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar") and  A.month !="" GROUP BY A.month`
        } else {
            where += ` and  A.month IN ("Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec") and  A.month !="" GROUP BY A.month`
        }
        return db.query("select  SUM(A.emission) as emission,A.month AS month_number,COALESCE('Business Travel', '')  as  category  from flight_travel A " + where);
    },

    hotel_stayDetails: async (facilities, year, finalyeardata) => {
        let where = "";
        where = ` where  A.year = '${year}' and status = 'S'`;
        if (facilities != '0') {
            where += `  and  A.facilities IN (${facilities})`
        }

        if (finalyeardata == '2') {
            where += ` and  A.month IN ("Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar") and  A.month !="" GROUP BY A.month`
        } else {
            where += ` and  A.month IN ("Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec") and  A.month !="" GROUP BY A.month`
        }

        return db.query("select   SUM(A.emission) as emission,A.month AS month_number,COALESCE('Business Travel', '')  as  category  from hotel_stay A " + where);
    },

    other_modes_of_transportDetails: async (facilities, year, finalyeardata) => {
        let where = "";
        where = ` where  A.year = '${year}' and status = 'S'`;
        if (facilities != '0') {
            where += `  and  A.facilities IN (${facilities})`
        }

        if (finalyeardata == '2') {
            where += ` and  A.month IN ("Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar") and  A.month !="" GROUP BY A.month`
        } else {
            where += ` and  A.month IN ("Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec") and  A.month !="" GROUP BY A.month`
        }

        return db.query("select SUM(A.emission) as emission,A.month AS month_number,COALESCE('Business Travel', '')  as  category from other_modes_of_transport A " + where);
    },

    processing_of_sold_products_categoryDetails: async (facilities, year, finalyeardata) => {
        let where = "";
        where = ` where  A.year = '${year}' and status = 'S'`;
        if (facilities != '0') {
            where += `  and  A.facilities IN (${facilities})`
        }
        if (finalyeardata == '2') {
            where += ` and  A.month IN ("Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar") and  A.month !="" GROUP BY A.month`
        } else {
            where += ` and  A.month IN ("Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec") and  A.month !="" GROUP BY A.month`
        }
        return db.query("select  SUM(A.emission) as emission,A.month AS month_number,COALESCE('Processing of Sold Products', '')  as  category from processing_of_sold_products_category A " + where);
    },

    sold_product_categoryDetails: async (facilities, year, finalyeardata) => {
        let where = "";
        where = ` where  A.year = '${year}' and status = 'S'`;
        if (facilities != '0') {
            where += `  and  A.facilities IN (${facilities})`
        }

        if (finalyeardata == '2') {
            where += ` and  A.month IN ("Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar") and  A.month !="" GROUP BY A.month`
        } else {
            where += ` and  A.month IN ("Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec") and  A.month !="" GROUP BY A.month`
        }

        return db.query("select SUM(A.emission) as emission,A.month AS month_number,COALESCE('Use of Sold Products', '')  as  category   from sold_product_category A " + where);
    },

    endoflife_waste_typeDetails: async (facilities, year, finalyeardata) => {
        let where = "";
        where = ` where  A.year = '${year}' and status = 'S'`;
        if (facilities != '0') {
            where += `  and  A.facilities IN (${facilities})`
        }
        if (finalyeardata == '2') {
            where += ` and  A.month IN ("Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar") and  A.month !="" GROUP BY A.month`
        } else {
            where += ` and  A.month IN ("Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec") and  A.month !="" GROUP BY A.month`
        }
        return db.query("select SUM(A.emission) as emission,A.month AS month_number,COALESCE('End-of-Life Treatment of Sold Products', '')  as  category from endof_lifetreatment_category A " + where);
    },

    water_supply_treatment_categoryDetails: async (facilities, year, finalyeardata) => {
        let where = "";
        where = ` where  A.year = '${year}' and status = 'S'`;
        if (facilities != '0') {
            where += `  and  A.facilities IN (${facilities})`
        }
        if (finalyeardata == '2') {
            where += ` and  A.month IN ("Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar") and  A.month !="" GROUP BY A.month`
        } else {
            where += ` and  A.month IN ("Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec") and  A.month !="" GROUP BY A.month`
        }
        return db.query("select SUM(A.emission) as emission,A.month AS month_number,COALESCE('Water Supply and Treatment', '')  as  category from water_supply_treatment_category A " + where);
    },

    employee_commuting_categoryDetails: async (facilities, year, finalyeardata) => {
        let where = "";
        where = ` where  A.year = '${year}' and status = 'S'`;
        if (facilities != '0') {
            where += `  and  A.facilities IN (${facilities})`
        }
        if (finalyeardata == '2') {
            where += ` and  A.month IN ("Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar") and  A.month !="" GROUP BY A.month`
        } else {
            where += ` and  A.month IN ("Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec") and  A.month !="" GROUP BY A.month`
        }
        return db.query("select  SUM(A.emission) as emission,A.month AS month_number,COALESCE('Employee Commuting', '')  as  category from employee_commuting_category A " + where);
    },

    homeoffice_categoryDetails: async (facilities, year, finalyeardata) => {
        let where = "";
        where = ` where  A.year = '${year}' and status = 'S'`;
        if (facilities != '0') {
            where += `  and  A.facilities IN (${facilities})`
        }
        if (finalyeardata == '2') {
            where += ` and  A.month IN ("Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar") and  A.month !="" GROUP BY A.month`
        } else {
            where += ` and  A.month IN ("Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec") and  A.month !="" GROUP BY A.month`
        }
        return db.query("select SUM(A.emission) as emission,A.month AS month_number,COALESCE('Home Office', '')  as  category from homeoffice_category A " + where);
    },

    waste_generated_emissionsDetails: async (facilities, year, finalyeardata) => {
        let where = "";
        where = ` where  A.year = '${year}' and status = 'S'`;
        if (facilities != '0') {
            where += `  and  A.facility_id IN (${facilities})`
        }
        if (finalyeardata == '2') {
            where += ` and  A.month IN ("Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar") and  A.month !="" GROUP BY A.month`
        } else {
            where += ` and  A.month IN ("Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec") and  A.month !="" GROUP BY A.month`
        }
        return db.query("select SUM(A.emission) as emission,A.month AS month_number,COALESCE('Waste generated in operations', '')  as  category from waste_generated_emissions A " + where);
    },

    upstreamLease_emissionDetails: async (facilities, year, finalyeardata) => {
        let where = "";
        where = ` where  A.year = '${year}' and status = 'S'`;
        if (facilities != '0') {
            where += `  and  A.facility_id IN (${facilities})`
        }
        if (finalyeardata == '2') {
            where += ` and  A.month IN ("Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar") and  A.month !="" GROUP BY A.month`
        } else {
            where += ` and  A.month IN ("Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec") and  A.month !="" GROUP BY A.month`
        }
        return db.query("select  SUM(A.emission) as emission,A.month AS month_number,COALESCE('Upstream Leased Assets', '')  as  category  from upstreamLease_emission A " + where);
    },

    downstreamLease_emissionDetails: async (facilities, year, finalyeardata) => {
        let where = "";
        where = ` where  A.year = '${year}' and status = 'S'`;
        if (facilities != '0') {
            where += `  and  A.facility_id IN (${facilities})`
        }
        if (finalyeardata == '2') {
            where += ` and  A.month IN ("Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar") and  A.month !="" GROUP BY A.month`
        } else {
            where += ` and  A.month IN ("Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec") and  A.month !="" GROUP BY A.month`
        }
        return db.query("select SUM(A.emission) as emission,A.month AS month_number,COALESCE('Downstream Leased Assets', '')  as  category from downstreamLease_emission A " + where);
    },

    franchise_categories_emissionDetails: async (facilities, year, finalyeardata) => {
        let where = "";
        where = ` where  A.year = '${year}' and status = 'S'`;
        if (facilities != '0') {
            where += `  and  A.facility_id IN (${facilities})`
        }
        if (finalyeardata == '2') {
            where += ` and  A.month IN ("Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar") and  A.month !="" GROUP BY A.month`
        } else {
            where += ` and  A.month IN ("Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec") and  A.month !="" GROUP BY A.month`
        }
        return db.query("select SUM(A.emission) as emission,A.month AS month_number,COALESCE('Franchises', '')  as  category  from franchise_categories_emission A  " + where);
    },

    investment_emissionsDetails: async (facilities, year, finalyeardata) => {
        let where = "";
        where = ` where  A.year = '${year}' and status = 'S'`;
        if (facilities != '0') {
            where += `  and  A.facilities IN (${facilities})`
        }
        if (finalyeardata == '2') {
            where += ` and  A.month IN ("Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar") and  A.month !="" GROUP BY A.month`
        } else {
            where += ` and  A.month IN ("Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec") and  A.month !="" GROUP BY A.month`
        }
        return db.query("select SUM(A.emission) as emission,A.month AS month_number,COALESCE('Investments', '')  as  category  from investment_emissions A  " + where);
    },

    upstream_vehicle_storage_emissions: async (facilities, year, finalyeardata) => {
        let where = "";
        where = ` where  A.year = '${year}' and status = 'S'`;
        if (facilities != '0') {
            where += `  and  A.facility_id IN (${facilities})`
        }
        if (finalyeardata == '2') {
            where += ` and  A.month IN ("Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar") and  A.month !="" GROUP BY A.month`
        } else {
            where += ` and  A.month IN ("Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec") and  A.month !="" GROUP BY A.month`
        }
        return db.query("select  SUM(A.emission) as emission,A.month AS month_number,COALESCE('Upstream Transportation and Distribution', '')  as  category from upstream_vehicle_storage_emissions A  " + where);
    },

    downstream_vehicle_storage_emissions: async (facilities, year, finalyeardata) => {
        let where = "";
        where = ` where  A.year = '${year}' and status = 'S'`;
        if (facilities != '0') {
            where += `  and  A.facility_id IN (${facilities})`
        }
        if (finalyeardata == '2') {
            where += ` and  A.month IN ("Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar") and  A.month !="" GROUP BY A.month`
        } else {
            where += ` and  A.month IN ("Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec") and  A.month !="" GROUP BY A.month`
        }
        return db.query("select SUM(A.emission) as emission,A.month AS month_number,COALESCE('Downstream Transportation and Distribution', '')  as  category from downstream_vehicle_storage_emissions A  " + where);
    },

    waste_generated_emissionsDetailsEmssion: async (facilities, year) => {
        let where = "";
        where = ` where  A.year = '${year}' and status = 'S'`;
        if (facilities != '0') {
            where += `  and  A.facility_id IN (${facilities})`
        }

        return db.query("select A.* from waste_generated_emissions A " + where);
    },

    waste_generated_emissionsDetailsEmssionByMethodemission: async (facilities, year, method) => {
        let where = "";
        where = ` where  A.year = '${year}' and status = 'S'`;
        if (facilities != '0') {
            where += `  and  A.facility_id IN (${facilities})`
        }
        where += ` and A.method = '${method}' GROUP BY A.year, A.facility_id, A.method`
        return db.query("select SUM(A.emission) as emission,A.year,A.facility_id,A.method from waste_generated_emissions A " + where);
    },

    getTop3CombustionEmission: async (facility_id, year) => {
        return db.query('SELECT SUM(A.GHGEmission) as Total_GHGEmission, A.TypeName \
    FROM stationarycombustionde A \
    WHERE \
    A.facility_id =? \
    AND Year = ? \
GROUP BY TypeName \
ORDER BY Total_GHGEmission DESC LIMIT 3', [facility_id, year]);
    },


    getTop3ReferenceEmission: async (facility_id, year) => {
        return db.query('SELECT \
    r.TypeName,\
            SUM(r.GHGEmission) AS Total_GHGEmission,\
            ref.Item   \
FROM`dbo.refrigerantde` r  \
LEFT JOIN`dbo.refrigents` ref ON r.subCategoryTypeId = ref.ID  \
WHERE r.facilities = ?    \
GROUP BY r.TypeName, ref.Item   \
ORDER BY Total_GHGEmission DESC   \
LIMIT 1; ', [facility_id, year]);
    },

    getEmissionData: async (facilityIds, year) => {
        try {
            // Define queries
            const queries = {
                combustionEmission: `
                    SELECT SUM(A.GHGEmission) AS Total_GHGEmission, A.TypeName 
                    FROM stationarycombustionde A 
                    WHERE A.facility_id IN (?) AND Year = ?
                    GROUP BY A.TypeName 
                    ORDER BY Total_GHGEmission DESC LIMIT 3;
                `,
                refrigerantEmission: `
                    SELECT r.TypeName, SUM(r.GHGEmission) AS Total_GHGEmission, ref.Item   
                    FROM \`dbo.refrigerantde\` r  
                    LEFT JOIN \`dbo.refrigents\` ref ON r.subCategoryTypeId = ref.ID  
                    WHERE r.facilities IN (?)    
                    GROUP BY r.TypeName, ref.Item   
                    ORDER BY Total_GHGEmission DESC LIMIT 1;
                `,
                extinguisherEmission: `
                    SELECT SUM(GHGEmission) AS Total_GHGEmission, facilities, year 
                    FROM \`dbo.fireextinguisherde\` 
                    WHERE facilities IN (?) AND year = ? AND status = 'S'  
                    GROUP BY facilities, year;
                `,
                // petrolVehicles: `
                //     SELECT SUM(v.GHGEmission) AS Total_GHGEmission, v.facilities, p.VehicleType 
                //     FROM \`dbo.vehiclede v\`
                //     LEFT JOIN \`dbo.passengervehicletypes\` p ON v.VehicleTypeId = p.ID
                //     WHERE v.facilities IN (?) AND p.VehicleType LIKE '%Petrol%'
                //     GROUP BY v.facilities, p.VehicleType;
                // `,
                dieselPassenger: `
                    SELECT SUM(v.GHGEmission) AS Total_GHGEmission, v.facilities, p.VehicleType 
                    FROM \`dbo.vehiclede\` v
                    LEFT JOIN \`dbo.passengervehicletypes\` p ON v.VehicleTypeId = p.ID
                    WHERE v.facilities IN (?) AND p.VehicleType LIKE '%Diesel%' 
                    AND v.Status = 'S' AND v.SubCategorySeedID = 10
                    GROUP BY v.facilities, p.VehicleType;
                `,
                dieselDelivery: `
                    SELECT SUM(v.GHGEmission) AS Total_GHGEmission, v.facilities, p.VehicleType 
                    FROM \`dbo.vehiclede\` v
                    LEFT JOIN \`dbo.passengervehicletypes\` p ON v.VehicleTypeId = p.ID
                    WHERE v.facilities IN (?) AND p.VehicleType LIKE '%Diesel%' 
                    AND v.Status = 'S' AND v.SubCategorySeedID = 11
                    GROUP BY v.facilities, p.VehicleType;
                `,
                petrolPassenger: `
                    SELECT SUM(v.GHGEmission) AS Total_GHGEmission, v.facilities, p.VehicleType 
                    FROM \`dbo.vehiclede\` v
                    LEFT JOIN \`dbo.passengervehicletypes\` p ON v.VehicleTypeId = p.ID
                    WHERE v.facilities IN (?) AND p.VehicleType LIKE '%Petrol%' 
                    AND v.Status = 'S' AND v.SubCategorySeedID = 11
                    GROUP BY v.facilities, p.VehicleType;
                `,
                petrolDelivery: `
                    SELECT SUM(v.GHGEmission) AS Total_GHGEmission, v.facilities, p.VehicleType 
                    FROM \`dbo.vehiclede\` v
                    LEFT JOIN \`dbo.passengervehicletypes\` p ON v.VehicleTypeId = p.ID
                    WHERE v.facilities IN (?) AND p.VehicleType LIKE '%Petrol%' 
                    AND v.Status = 'S' AND v.SubCategorySeedID = 11
                    GROUP BY v.facilities, p.VehicleType;
                `
            };
    
            // Execute all queries asynchronously
            const results = await Promise.all([
                db.query(queries.combustionEmission, [facilityIds, year]),
                db.query(queries.refrigerantEmission, [facilityIds]),
                db.query(queries.extinguisherEmission, [facilityIds, year]),
                // db.query(queries.petrolVehicles, [facilityIds]),
                db.query(queries.dieselPassenger, [facilityIds]),
                db.query(queries.dieselDelivery, [facilityIds]),
                db.query(queries.petrolPassenger, [facilityIds]),
                db.query(queries.petrolDelivery, [facilityIds])
            ]);
    
            // Return structured response
            return {
                success: true,
                message: "GHG Emission data fetched successfully",
                data: {
                    combustionEmission: results[0],
                    refrigerantEmission: results[1],
                    extinguisherEmission: results[2],
                    petrolVehicles: results[3],
                    dieselPassenger: results[4],
                    dieselDelivery: results[5],
                    petrolPassenger: results[6],
                    petrolDelivery: results[7]
                }
            };
    
        } catch (error) {
            console.error("Database error:", error);
            return { success: false, message: "Error fetching emission data", error };
        }
    },
    
}
