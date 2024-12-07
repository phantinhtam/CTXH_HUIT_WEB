import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiLogIn } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { baseApiURL } from "../baseUrl";
const Login = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Student");
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    if (data.login !== "" && data.password !== "") {
      const headers = {
        "Content-Type": "application/json",
      };
      axios
        .post(`${baseApiURL()}/${selected.toLowerCase()}/auth/login`, data, {
          headers: headers,
        })
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
    } else {
    }
  };
  return (
    <div className="bg-white h-[100vh] w-full flex">
  {/* Phần danh sách thông báo */}
  <div className="w-[40%] h-full overflow-y-auto p-4 bg-blue-50">
    {notice && notice.length > 0 ? (
      notice.map((item, index) => (
        <div
          key={item._id}
          className="border-blue-500 border-2 w-full rounded-md shadow-sm py-4 px-6 mb-4"
        >
          <div className="flex justify-between items-center">
            <p
              className={`text-lg font-medium ${
                item.link && "cursor-pointer"
              } group`}
              onClick={() => item.link && window.open(item.link)}
            >
              {item.title}
              {item.link && (
                <span className="text-2xl group-hover:text-blue-500 ml-2">
                  <IoMdLink />
                </span>
              )}
            </p>
            <span className="text-sm text-gray-500">
              {item.createdAt.split("T")[0]}
            </span>
          </div>
          <p className="text-base font-normal mt-1">{item.description}</p>
          {(router.pathname === "/faculty" || router.pathname === "/admin") && (
            <div className="mt-2 flex justify-end">
              <span
                className="text-red-500 cursor-pointer"
                onClick={() => deleteNoticehandler(item._id)}
              >
                <MdDeleteOutline />
              </span>
              <span
                className="text-blue-500 cursor-pointer ml-4"
                onClick={() => setOpenEditSectionHandler(index)}
              >
                <MdEditNote />
              </span>
            </div>
          )}
        </div>
      ))
    ) : (
      <p className="text-center text-gray-500">Không có thông báo nào</p>
    )}
  </div>

  {/* Phần thêm thông báo */}
  <div className="w-[60%] h-full flex items-center justify-center">
    {open ? (
      <form className="w-2/3 p-4 bg-white shadow-md rounded">
        <h2 className="text-lg font-medium mb-4">
          {edit ? "Cập nhật thông báo" : "Thêm thông báo mới"}
        </h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Tiêu đề thông báo
          </label>
          <input
            type="text"
            className="bg-blue-50 py-2 px-4 w-full"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Mô tả thông báo
          </label>
          <textarea
            className="bg-blue-50 py-2 px-4 w-full resize-none"
            rows="4"
            value={data.description}
            onChange={(e) =>
              setData({ ...data, description: e.target.value })
            }
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Link thông báo (tùy chọn)
          </label>
          <input
            type="text"
            className="bg-blue-50 py-2 px-4 w-full"
            value={data.link}
            onChange={(e) => setData({ ...data, link: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Loại thông báo
          </label>
          <select
            className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full"
            value={data.type}
            onChange={(e) => setData({ ...data, type: e.target.value })}
          >
            <option value="student">Sinh viên</option>
            <option value="faculty">Khoa</option>
            <option value="both">Cả hai</option>
          </select>
        </div>
        <button
          onClick={edit ? updateNoticehandler : addNoticehandler}
          className="bg-blue-500 text-white px-6 py-2 rounded w-full"
        >
          {edit ? "Cập nhật" : "Thêm"}
        </button>
      </form>
    ) : (
      <img
        className="w-full h-full object-cover"
        src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Placeholder"
      />
    )}
  </div>
</div>

      <div className="w-[40%] flex justify-center items-start flex-col pl-8">
        <p className="text-3xl font-semibold pb-2 border-b-2 border-green-500">
          {/* {selected && selected} */}     Đăng nhập 
        </p>
        <form
          className="flex justify-center items-start flex-col w-full mt-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col w-[70%]">
            <label className="mb-1" htmlFor="eno">
              {/* {selected && selected}*/} Mã số  
            </label>
            <input
              type="number"
              id="eno"
              required
              className="bg-white outline-none border-2 border-gray-400 py-2 px-4 rounded-md w-full focus:border-blue-500"
              {...register("loginid")}
            />
          </div>
          <div className="flex flex-col w-[70%] mt-3">
            <label className="mb-1" htmlFor="password">
              Mật khẩu 
            </label>
            <input
              type="password"
              id="password"
              required
              className="bg-white outline-none border-2 border-gray-400 py-2 px-4 rounded-md w-full focus:border-blue-500"
              {...register("password")}
            />
          </div>
          {/* <div className="flex w-[70%] mt-3 justify-start items-center">
            <input type="checkbox" id="remember" className="accent-blue-500" />{" "}
            Remember Me
          </div> */}
          <button className="bg-blue-500 mt-5 text-white px-6 py-2 text-xl rounded-md hover:bg-blue-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all flex justify-center items-center">
            Đăng nhập
            <span className="ml-2">
              <FiLogIn />
            </span>
          </button>
        </form>
      </div>
      <div className="absolute top-4 right-4">
        <button
          className={`text-blue-500 mr-6 text-base font-semibold hover:text-blue-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
            selected === "Student" && "border-b-2 border-green-500"
          }`}
          onClick={() => setSelected("Student")}
        >
          Sinh Viên
        </button>
        <button
          className={`text-blue-500 mr-6 text-base font-semibold hover:text-blue-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
            selected === "Faculty" && "border-b-2 border-green-500"
          }`}
          onClick={() => setSelected("Faculty")}
        >
          Khoa
        </button>
        <button
          className={`text-blue-500 mr-6 text-base font-semibold hover:text-blue-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
            selected === "Admin" && "border-b-2 border-green-500"
          }`}
          onClick={() => setSelected("Admin")}
        >
          Quản trị viên
        </button>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Login;