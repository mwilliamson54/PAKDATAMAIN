import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// Define the database credentials
const DB_HOST = "mysql-2d05bb08-ranjhaplaysyt-1cd6.a.aivencloud.com";
const DB_PORT = 28431;
const DB_USER = "avnadmin";
const DB_PASSWORD = "AVNS_1MQ-ZTaBJtyzJXpRQys";
const DB_NAME = "NADRA";

const pool = mysql.createPool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
});

// Fisher-Yates shuffle algorithm
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export async function POST(req) {
    try {
        const tableName = [
            "table_312",
            "table_333",
            "table_300",
            "table_301",
            "table_334",
        ];

        let rows = [];

        for (const table of tableName) {
            const [resultRows, fields] = await pool.query(
                `SELECT MOBILE FROM ${table} LIMIT 20`
            );
            rows.push(...resultRows);
        }

        // Sort the rows by MOBILE column
        rows.sort((a, b) => a.MOBILE.localeCompare(b.MOBILE));

        // Shuffle the rows to change the order deeply
        rows = shuffle(rows);

        if (rows.length > 0) {
            return NextResponse.json({
                status: "success",
                message: "Data found",
                data: rows,
            });
        } else {
            return NextResponse.json({
                status: "error",
                message: "No data found",
            });
        }
    } catch (error) {
        console.error("Error:", error.message);
        return NextResponse.json({
            status: "error",
            message: "An unexpected error occurred",
            error: error.message,
        });
    }
}