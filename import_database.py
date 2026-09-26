import pandas as pd
import sqlite3

file_path = "datatables.xlsx"

# Read Excel sheets into DataFrames
disciplines_df = pd.read_excel(
    file_path,
    sheet_name="Disciplines"
)

procedures_df = pd.read_excel(
    file_path,
    sheet_name="Procedures"
)

objectives_df = pd.read_excel(
    file_path,
    sheet_name="Objectives"
)

sequence_df = pd.read_excel(
    file_path,
    sheet_name="Sequence"
)

# Connect to SQLite
conn = sqlite3.connect("sequenceme.db")

# Write DataFrames to SQL tables
disciplines_df.to_sql(
    "disciplines",
    conn,
    if_exists="replace",
    index=False
)

procedures_df.to_sql(
    "procedures",
    conn,
    if_exists="replace",
    index=False
)

objectives_df.to_sql(
    "objectives",
    conn,
    if_exists="replace",
    index=False
)

sequence_df.to_sql(
    "sequence",
    conn,
    if_exists="replace",
    index=False
)

# Close database
conn.close()

print("SequenceMe database created successfully.")
