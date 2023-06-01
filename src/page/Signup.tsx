import React, { useEffect, useState } from "react";
import { Button, Col, Row, Table, Typography } from "antd";
import { utils, writeFileXLSX } from "xlsx";
import { ColumnsType } from "antd/es/table";
import { getSignups } from "src/api/background";
import { Session } from "src/api/interface";
interface Column {
  id: number;
  name: string;
  phoneNumber: string;
  joinNumber: number;
  email: number;
  isParking: boolean;
  isShuttle: boolean;
  isVerified: boolean;
  isCheckin: boolean;
  session: Session;
}

const column: ColumnsType<Column> = [
  {
    title: "員編",
    key: "id",
    dataIndex: "id",
  },
  {
    title: "姓名",
    key: "name",
    dataIndex: "name",
  },
  {
    title: "電話號碼",
    key: "phoneNumber",
    dataIndex: "phoneNumber",
  },
  {
    title: "參加人數",
    key: "joinNumber",
    dataIndex: "joinNumber",
  },
  {
    title: "參加場次",
    key: "session",
    dataIndex: "session",
    render: (session: Session) => session.name,
  },
  {
    title: "信箱",
    key: "email",
    dataIndex: "email",
  },
  {
    title: "是否停車",
    key: "isParking",
    dataIndex: "isParking",
    render: (value: boolean) => (value === true ? "是" : "否"),
  },
  {
    title: "是否接駁",
    key: "isShuttle",
    dataIndex: "isShuttle",
    render: (value: boolean) => (value === true ? "是" : "否"),
  },
  {
    title: "是否驗證",
    key: "isVerified",
    dataIndex: "isVerified",
    render: (value: boolean) =>
      value === true ? (
        "是"
      ) : (
        <Typography.Text type="danger">否</Typography.Text>
      ),
  },
  {
    title: "是否報到",
    key: "isCheckin",
    dataIndex: "isCheckin",
    render: (value: boolean) => (value === true ? "是" : "否"),
  },
];

const Signup: React.FC = () => {
  const [signups, setSignups] = useState<Column[]>([]);
  const exportExcel = () => {
    const dataToExport = signups.map((signup) => {
      return {
        員編: signup.id,
        姓名: signup.name,
        電話號碼: signup.phoneNumber,
        參加場次: signup.session.name,
        Email: signup.email,
        參加人數: signup.joinNumber,
        是否停車: signup.isParking,
        是否接駁: signup.isShuttle,
        是否驗證: signup.isVerified,
        是否報到: signup.isCheckin,
      };
    });
    const ws = utils.json_to_sheet(dataToExport);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "報名紀錄");
    writeFileXLSX(wb, "報名紀錄.xlsx");
  };

  useEffect(() => {
    getSignups()
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          setSignups(res.data.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <Row>
      <Col span={24}>
        <Button onClick={exportExcel} type="primary">
          匯出
        </Button>
      </Col>
      <Col span={24}>
        <Table size="small" rowKey="id" columns={column} dataSource={signups} />
      </Col>
    </Row>
  );
};

export default Signup;
