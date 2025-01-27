import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

const numdatabases = {
    db1: {
        host: "mysql-2d05bb08-ranjhaplaysyt-1cd6.a.aivencloud.com",
        port: 28431,
        user: "avnadmin",
        password: "AVNS_1MQ-ZTaBJtyzJXpRQys",
        database: "NADRA",
    },
    db2: {
        host: "mysql-341e5eec-faisalshahzadyt-39e8.a.aivencloud.com",
        port: 12918,
        user: "avnadmin",
        password: "AVNS_xMDhZvw0nqB-wL7eF0L",
        database: "NADRA",
    },
    db3: {
        host: "mysql-3dc5a780-ranjhagaming44-ef10.a.aivencloud.com",
        port: 24075,
        user: "avnadmin",
        password: "AVNS_af-sK2kQLb-IAVFSsNN",
        database: "NADRA",
    },
    db4: {
        host: "mysql-1d488cc9-codewithfaisal4-2e4d.a.aivencloud.com",
        port: 10160,
        user: "avnadmin",
        password: "AVNS_DwrwyKA4zjv0jOMp2Gm",
        database: "NADRA",
    },
    db5: {
        host: "mysql-31ec2ba9-faisal447846-1a00.a.aivencloud.com",
        port: "16285",
        user: "avnadmin",
        password: "AVNS_Lkfg1IkFwc45v_Xrf8j",
        database: "NADRA",
    },
    db6: {
        host: "mysql-28091021-faisalshahzadyt1-45e8.b.aivencloud.com",
        port: "27439",
        user: "avnadmin",
        password: "AVNS_P3n1SclXh_BqnnRVDXL",
        database: "NADRA",
    },
};

const cnicdatabases = {
    db1: {
        host: "mysql-28091021-faisalshahzadyt1-45e8.b.aivencloud.com",
        port: "27439",
        user: "avnadmin",
        password: "AVNS_P3n1SclXh_BqnnRVDXL",
        database: "NADRA",
    },
    db2: {
        host: "mysql-63ff40e-felibg-1091.b.aivencloud.com",
        port: 17446,
        user: "avnadmin",
        password: "AVNS_gjraUgtyU_DEmrFlazF",
        database: "NADRA",
    },
    db3: {
        host: "mysql-1978de28-rartg-6c4d.b.aivencloud.com",
        port: 25007,
        user: "avnadmin",
        password: "AVNS_HQI-xtvK1KScPL-RHJA",
        database: "NADRA",
    },
    db4: {
        host: "mysql-238491f1-project-4777.b.aivencloud.com",
        port: "11166",
        user: "avnadmin",
        password: "AVNS_BTTcC09W2PQln_GMCmW",
        database: "NADRA",
    },
    db5: {
        host: "mysql-c90c836-etopys-1cb9.b.aivencloud.com",
        port: "15909",
        user: "avnadmin",
        password: "AVNS_-Ulq2wZOxDOnIRGnmcI",
        database: "NADRA",
    },
    db6: {
        host: "mysql-2a81e8ae-kravify-ad30.b.aivencloud.com",
        port: "20455",
        user: "avnadmin",
        password: "AVNS_qs6s7YoNXqhRvRW4Ddd",
        database: "NADRA",
    },
    db7: {
        host: "mysql-3a403e85-kravify-0f99.b.aivencloud.com",
        user: "avnadmin",
        port: 24080,
        password: "AVNS_LIt98X8FrFCF2SUe4Kq",
        database: "NADRA",
    },
    db8: {
        host: "mysql-39082126-rartg-de61.b.aivencloud.com",
        user: "avnadmin",
        port: 15653,
        password: "AVNS_mzwwc1bcKJJLEH09EeI",
        database: "NADRA",
    },
};

const createPoolAndFetchTables = async (databases) => {
    const pools = Object.values(databases).map((config) =>
        mysql.createPool(config)
    );
    const tables = {};

    for (const [dbNumber, pool] of Object.entries(databases)) {
        const connection = await pools[
            parseInt(dbNumber.substring(2)) - 1
        ].getConnection();
        const [rows] = await connection.query("SHOW TABLES");
        connection.release();
        tables[dbNumber] = rows.map((row) => row[Object.keys(row)[0]]);
    }

    return tables;
};

export async function POST(req) {
    try {
        const numTables = await createPoolAndFetchTables(numdatabases);
        const cnicTables = await createPoolAndFetchTables(cnicdatabases);

        return NextResponse.json({
            numTables,
            cnicTables,
        });
    } catch (error) {
        console.error("Error:", error.message);
        return NextResponse.json({
            status: "error",
            message: "An unexpected error occurred",
            error: error.message,
        });
    }
}
