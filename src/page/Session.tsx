import React, { useEffect, useState } from "react";
import { Divider, Input, Table, Typography } from "antd";
import { getSessions } from "src/api/background";
import { ColumnsType } from "antd/es/table";

const { Link } = Typography;
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

const Session: React.FC = () => {
  const [sessions, setSesstions] = useState<Column[]>([]);
  const [editingRows, setEditingRows] = useState<number[]>([]);

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
      render: (text, record) => {
        return <></>;
      },
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
            {editingRows.find((id) => record.id === id) ? (
              <>
                <Link
                  onClick={() =>
                    setEditingRows((pre) =>
                      pre.filter((rowId) => rowId !== record.id)
                    )
                  }
                >
                  儲存
                </Link>
                <Divider type="vertical" />
                <Link underline type="danger">
                  取消
                </Link>
              </>
            ) : (
              <>
                <>
                  <Link
                    underline
                    onClick={() => setEditingRows((pre) => [...pre, record.id])}
                  >
                    編輯
                  </Link>
                  <Divider type="vertical" />
                  <Link underline type="danger">
                    刪除
                  </Link>
                </>
              </>
            )}
          </>
        );
      },
    },
  ];

  const onAddRow = () => {
    // const lastSession = sessions[sessions.length - 1];
    // const { id } = lastSession;
    // const newRow: Column = {
    //   id: id + 1,
    //   name: "",
    //   place: "",
    //   joinLimit: 0,
    //   isParking: false,
    //   isShuttle: false,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // };
    // setSesstions([...sessions, newRow]);
  };

  const tableFooter = () => {
    return (
      <Link underline onClick={onAddRow}>
        新增欄位
      </Link>
    );
  };

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
    <Table
      size="small"
      rowKey="id"
      columns={column}
      dataSource={sessions}
      footer={tableFooter}
    />
  );
};

export default Session;
