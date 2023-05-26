import React, { useEffect, useState } from "react";
import { Divider, Table, Typography } from "antd";
import { getSessions } from "src/api/background";
import { ColumnsType } from "antd/es/table";

interface Column {
  id: number;
  name: string;
  place: string;
  joinLimit: number;
  isParking: boolean;
  isShuttle: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const column: ColumnsType<Column> = [
  {
    title: "ID",
    key: "id",
    dataIndex: "id",
  },
  {
    title: "場次名稱",
    key: "name",
    dataIndex: "name",
  },
  {
    title: "場次地點",
    key: "plcae",
    dataIndex: "place",
  },
  {
    title: "人數上限",
    key: "joinLimit",
    dataIndex: "joinLimit",
  },
  {
    title: "是否提供停車",
    key: "isParking",
    dataIndex: "isParking",
    render: (value: boolean) => (value === true ? "是" : "否"),
  },
  {
    title: "是否提供接駁",
    key: "isShuttle",
    dataIndex: "isShuttle",
    render: (value: boolean) => (value === true ? "是" : "否"),
  },
  {
    title: "創建時間",
    key: "createdAt",
    dataIndex: "createdAt",
  },
  {
    title: "最後更新時間",
    key: "updatedAt",
    dataIndex: "updatedAt",
  },
  {
    title: "操作",
    render: (_, record) => {
      return (
        <>
          <Typography.Link underline>編輯</Typography.Link>
          <Divider type="vertical" />
          <Typography.Link underline type="danger">
            刪除
          </Typography.Link>
        </>
      );
    },
  },
];

const Session: React.FC = () => {
  const [sessions, setSesstions] = useState([]);

  useEffect(() => {
    getSessions()
      .then((res) => {
        if ((res.data.status = "success")) {
          setSesstions(res.data.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <Table size="small" rowKey="id" columns={column} dataSource={sessions} />
  );
};

export default Session;
