import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Form,
  Input,
  Modal,
  Select,
  Table,
  Typography,
} from "antd";
import {
  deleteSessionById,
  getSessions,
  patchSession,
  postSession,
} from "src/api/background";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

const { Link, Text } = Typography;
const { Item, useForm } = Form;

dayjs.extend(utc);
dayjs.extend(timezone);

interface Column {
  id: number;
  name: string;
  place: string;
  joinLimit: number | string;
  isParking: boolean;
  isShuttle: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
}

interface FormValues {
  id: number;
  name: string;
  place: string;
  joinLimit: number;
  isParking: boolean;
  isShuttle: boolean;
}

const Session: React.FC = () => {
  const [form] = useForm();
  const [sessions, setSesstions] = useState<Column[]>([]);
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const column: ColumnsType<Column> = [
    {
      title: "ID",
      key: "id",
      dataIndex: "id",
      render: (text, record) => {
        return (
          <>
            {editingRow === record.id ? (
              <Item name="id" style={{ marginBottom: "0" }}>
                <Text>{record.id}</Text>
              </Item>
            ) : (
              text
            )}
          </>
        );
      },
    },
    {
      title: "場次名稱",
      key: "name",
      dataIndex: "name",
      width: 120,
      render: (text, record) => {
        return (
          <>
            {editingRow === record.id ? (
              <>
                <Item
                  name="name"
                  rules={[{ required: true, message: "場次名稱不能為空" }]}
                  style={{ marginBottom: "0" }}
                >
                  <Input style={{ width: "120px" }} />
                </Item>
              </>
            ) : (
              text
            )}
          </>
        );
      },
    },
    {
      title: "場次地點",
      key: "plcae",
      dataIndex: "place",
      width: 150,
      render: (text, record) => {
        return (
          <>
            {editingRow === record.id ? (
              <Item
                name="place"
                rules={[{ required: true, message: "場次地點不能為空" }]}
                style={{ marginBottom: "0" }}
              >
                <Input style={{ width: "150px" }} />
              </Item>
            ) : (
              text
            )}
          </>
        );
      },
    },
    {
      title: "人數上限",
      key: "joinLimit",
      dataIndex: "joinLimit",
      align: "right",
      width: 150,
      render: (text, record) => {
        return (
          <>
            {editingRow === record.id ? (
              <Item
                name="joinLimit"
                rules={[{ required: true, message: "人數上限不能為空" }]}
                style={{ marginBottom: "0" }}
              >
                <Input
                  inputMode="numeric"
                  type="number"
                  style={{ width: "100px" }}
                />
              </Item>
            ) : (
              text
            )}
          </>
        );
      },
    },
    {
      title: "是否提供停車",
      key: "isParking",
      dataIndex: "isParking",
      width: 120,
      render: (text, record) => {
        return (
          <>
            {editingRow === record.id ? (
              <Item name="isParking" style={{ marginBottom: "0" }}>
                <Select
                  options={[
                    { label: "是", value: true },
                    { label: "否", value: false },
                  ]}
                  style={{ width: "80px" }}
                />
              </Item>
            ) : (
              <>{record.isParking ? "是" : "否"}</>
            )}
          </>
        );
      },
    },
    {
      title: "是否提供接駁",
      key: "isShuttle",
      dataIndex: "isShuttle",
      width: 120,
      render: (text, record) => {
        return (
          <>
            {editingRow === record.id ? (
              <Item name="isShuttle" style={{ marginBottom: "0" }}>
                <Select
                  options={[
                    { label: "是", value: true },
                    { label: "否", value: false },
                  ]}
                  style={{ width: "80px" }}
                />
              </Item>
            ) : (
              <>{record.isShuttle ? "是" : "否"}</>
            )}
          </>
        );
      },
    },
    {
      title: "創建時間",
      key: "createdAt",
      dataIndex: "createdAt",
      render: (value) =>
        value
          ? dayjs(value)
              .utc(true)
              .tz(dayjs.tz.guess())
              .format("YYYY-MM-DD HH:mm:ss")
          : "",
    },
    {
      title: "最後更新時間",
      key: "updatedAt",
      dataIndex: "updatedAt",
      render: (value) =>
        value
          ? dayjs(value)
              .utc(true)
              .tz(dayjs.tz.guess())
              .format("YYYY-MM-DD HH:mm:ss")
          : "",
    },
    {
      title: "操作",
      render: (text, record) => {
        return (
          <>
            {editingRow === record.id ? (
              <>
                <Item noStyle>
                  <Button
                    type="link"
                    htmlType="submit"
                    style={{ padding: "0" }}
                  >
                    儲存
                  </Button>
                </Item>
                <Divider type="vertical" />
                <Link
                  type="danger"
                  onClick={() => {
                    setEditingRow(null);
                    setIsAdding(false);
                    if (isAdding) {
                      setSesstions(sessions.slice(0, sessions.length - 1));
                    }
                  }}
                >
                  取消
                </Link>
              </>
            ) : (
              <>
                <>
                  <Link
                    underline
                    onClick={() => {
                      setEditingRow(record.id);
                      setIsAdding(false);
                      form.setFieldsValue(record);
                    }}
                  >
                    編輯
                  </Link>
                  <Divider type="vertical" />
                  <Link
                    underline
                    type="danger"
                    onClick={() => {
                      Modal.confirm({
                        title: (
                          <Text type="danger">警告！此操作無法回復！</Text>
                        ),
                        content: (
                          <>
                            <p>
                              確定要＂<Text type="danger">刪除</Text>
                              ＂以下場次嗎？
                            </p>
                            <p>場次名稱：{record.name}</p>
                          </>
                        ),
                        okText: "確認",
                        cancelText: "取消",
                        onOk: () => {
                          deleteSessionById(record.id)
                            .then((res) => {
                              getSessions()
                                .then((res) => {
                                  if ((res.data.status = "success")) {
                                    setSesstions(res.data.data);
                                  }
                                })
                                .catch((err) => {
                                  console.error(err);
                                });
                            })
                            .catch((err) => {
                              console.error(err);
                            });
                        },
                      });
                    }}
                  >
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

  const onFormSubmit = async (values: FormValues) => {
    setEditingRow(null);
    if (isAdding) {
      postSession(values)
        .then((res) => {
          if ((res.data.status = "success")) {
            getSessions()
              .then((res) => {
                if ((res.data.status = "success")) {
                  setSesstions(res.data.data);
                }
              })
              .catch((err) => {
                console.error(err);
              });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      patchSession(values.id, values)
        .then((res) => {
          if ((res.data.status = "success")) {
            getSessions()
              .then((res) => {
                if ((res.data.status = "success")) {
                  setSesstions(res.data.data);
                }
              })
              .catch((err) => {
                console.error(err);
              });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
    setIsAdding(false);
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
    <Form form={form} onFinish={onFormSubmit}>
      <Table
        size="small"
        rowKey="id"
        columns={column}
        dataSource={sessions}
        footer={() => {
          return (
            <>
              {!isAdding && (
                <Link
                  onClick={() => {
                    if (editingRow !== null) {
                      form.resetFields();
                      setEditingRow(null);
                    }
                    setIsAdding(true);
                    const newSession = {
                      id: sessions[sessions.length - 1].id + 1,
                      name: "",
                      place: "",
                      joinLimit: "",
                      isParking: false,
                      isShuttle: false,
                      createdAt: null,
                      updatedAt: null,
                    };
                    setSesstions([...sessions, newSession]);
                    setEditingRow(newSession.id);
                    form.setFieldsValue(newSession);
                  }}
                >
                  新增場次
                </Link>
              )}
            </>
          );
        }}
      />
    </Form>
  );
};

export default Session;
