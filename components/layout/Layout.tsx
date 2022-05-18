import React, { ReactNode } from "react";
import { NextPage } from "next";
import DataTable from "./DataTable";

type ComponentProps = {
  children: ReactNode;
};

const Layout: NextPage<ComponentProps> = ({ children }) => {
  return (
    <>
      <DataTable></DataTable>
      <main>{children}</main>
    </>
  );
};

export default Layout;
