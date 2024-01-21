import React from "react";
import { Menu } from "antd";
import { BarChartOutlined } from "@ant-design/icons";

const NavBar = () => {
  return (
    <div
      style={{
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
        background: "#f0f5ff",
      }}
    >
      <Menu
        mode="horizontal"
        defaultSelectedKeys={["mail"]}
        style={{ background: "#f0f5ff" }}
      >
        <Menu.Item
          key="analytics"
          icon={<BarChartOutlined style={{ fontSize: "30px" }} />}
        >
          Dashboard
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default NavBar;
