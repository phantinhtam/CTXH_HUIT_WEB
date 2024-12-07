import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiLogIn } from "react-icons/fi";
import { IoMdLink } from "react-icons/io";
import { MdDeleteOutline, MdEditNote } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { baseApiURL } from "../baseUrl";

const Login = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Student");
  const [notice, setNotice] = useState([]);
  const [data, setData] = useState({ title: "", description: "", link: "", type: "" });
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    if (data.login !== "" && data.password !== "") {
      const headers = { "Content-Type": "application/json" };
      axios
        .post(`${baseApiURL()}/${selected.toLowerCase()}/auth/login`, data, { headers })
        .then((response) => {
          navigate(`/${selected.toLowerCase()}`, {
            state: { type: selected, loginid: response.data.loginid },
          });
        })
        .catch((error) => {
          toast.dismiss();
          console.error(error);
          toast.error(error.response.data.message);
        });
    }
  };

  const deleteNoticehandler = (id) => {
    // Logic xóa thông báo
    console.log("Delete notice:", id);
  };

  const setOpenEditSectionHandler = (index) => {
    setOpen(true);
    setEdit(true);
    // Logic chỉnh sửa
  };

  const addNoticehandler = () => {
    // Logic thêm thông báo
    console.log("Add notice:", data);
  };

  const updateNoticehandler = () => {
    // Logic cập nhật thông báo
    console.log("Update notice:", data);
  };

  return (
    <div className="bg-white h-[100vh] w-full flex">
      {/* Phần danh sách thông báo */}
      <div className="w-[40%] h-full overflow-y-auto p-4 bg-blue-50">
        {notice.length > 0 ? (
          notice.map((item, index) => (
            <div
              key={item._id}
              className="border-blue-500 border-2 w-full rounded-md shadow-sm py-4 px-6 mb-4"
            >
              {/* Nội dung thông báo */}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Không có thông báo nào</p>
        )}
      </div>
      {/* Phần thêm thông báo */}
      {/* ... */}
    </div>
  );
};

export default Login;
