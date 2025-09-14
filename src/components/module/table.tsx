import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { UserType } from "@/types/dataType.type";
import Image from "next/image";
import { DateOption } from "@/constant/constant";

export default function BasicTable({ rows }: { rows: Partial<UserType>[] }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="users table">
        <TableHead>
          <TableRow>
            <TableCell>Full Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Mobile</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Profile</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, index) => (
            <TableRow
              key={row._id || index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.fullName}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.mobile}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>
                {row.profile ? (
                  <Image
                    width={200}
                    height={200}
                    src={row.profile}
                    alt={row.fullName || "profile"}
                    style={{ width: 40, height: 40, borderRadius: "50%" }}
                  />
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell>
                {row.createdAt
                  ? new Date(row.createdAt).toLocaleDateString(
                      "fa-IR",
                      DateOption,
                    )
                  : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
