import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setUserData } from "../../redux/actions";
import { baseApiURL } from "../../baseUrl";
import toast from "react-hot-toast";

const Profile = () => {
  const [showPass, setShowPass] = useState(false);
  const router = useLocation();
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const [password, setPassword] = useState({
    new: "",
    current: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/${router.state.type}/details/getDetails`,
        { employeeId: router.state.loginid },
        { headers }
      )
      .then((response) => {
        if (response.data.success) {
          setData(response.data.user[0]);
          dispatch(
            setUserData({
              fullname: `${response.data.user[0].firstName} ${response.data.user[0].middleName} ${response.data.user[0].lastName}`,
              semester: response.data.user[0].semester,
              enrollmentNo: response.data.user[0].enrollmentNo,
              branch: response.data.user[0].branch,
            })
          );
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch, router.state.loginid, router.state.type]);

  const checkPasswordHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/admin/auth/login`,
        { loginid: router.state.loginid, password: password.current },
        { headers }
      )
      .then((response) => {
        if (response.data.success) {
          changePasswordHandler(response.data.id);
        } else {
          toast.error(response.data.message);
          setLoading(false);
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "An error occurred");
        console.error(error);
        setLoading(false);
      });
  };

  const changePasswordHandler = (id) => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .put(
        `${baseApiURL()}/admin/auth/update/${id}`,
        { loginid: router.state.loginid, password: password.new },
        { headers }
      )
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          setPassword({ new: "", current: "" });
        } else {
          toast.error(response.data.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "An error occurred");
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <div className="w-full mx-auto my-8 flex flex-col items-center">
      {data && (
        <>
          {/* Hồ sơ Sinh viên */}
          <div className="w-full max-w-3xl p-6 border-2 border-blue-500 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-semibold">
                  {data.firstName} {data.middleName} {data.lastName}
                </p>
                <div className="mt-3">
                  <p className="text-lg font-normal mb-2">
                    ID Sinh Viên: {data.enrollmentNo}
                  </p>
                  <p className="text-lg font-normal mb-2">
                    Số Điện Thoại: +91 {data.phoneNumber}
                  </p>
                  <p className="text-lg font-normal mb-2">
                    Địa chỉ Email: {data.email}
                  </p>
                  <p className="text-lg font-normal mb-2">
                    Ngành: {data.branch}
                  </p>
                  <p className="text-lg font-normal mb-2">
                    Học kỳ: {data.semester}
                  </p>
                </div>
              </div>
              <img
                src={process.env.REACT_APP_MEDIA_LINK + "/" + data.profile}
                alt="Hồ Sơ Sinh Viên"
                className="h-[200px] w-[200px] object-cover rounded-lg shadow-md"
              />
            </div>

            {/* Thay Đổi Mật Khẩu */}
            <button
              className={`${
                showPass ? "bg-red-100 text-red-600" : "bg-blue-600 text-white"
              }  px-3 py-1 rounded mt-4`}
              onClick={() => setShowPass(!showPass)}
            >
              {!showPass ? "Thay Đổi Mật Khẩu" : "Đóng Thay Đổi Mật Khẩu"}
            </button>
            {showPass && (
              <form
                className="mt-4 border-t-2 border-blue-500 flex flex-col justify-center items-start"
                onSubmit={checkPasswordHandler}
              >
                <input
                  type="password"
                  value={password.current}
                  onChange={(e) =>
                    setPassword({ ...password, current: e.target.value })
                  }
                  placeholder="Mật khẩu hiện tại"
                  className="px-3 py-1 border-2 border-blue-500 outline-none rounded mt-4"
                />
                <input
                  type="password"
                  value={password.new}
                  onChange={(e) =>
                    setPassword({ ...password, new: e.target.value })
                  }
                  placeholder="Mật khẩu mới"
                  className="px-3 py-1 border-2 border-blue-500 outline-none rounded mt-4"
                />
                <button
                  className="mt-4 hover:border-b-2 hover:border-blue-500"
                  onClick={checkPasswordHandler}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Đang thay đổi..." : "Thay Đổi Mật Khẩu"}
                </button>
              </form>
            )}
          </div>

          {/* Kết quả tự đánh giá */}
          <div className="mt-8 w-full max-w-3xl p-6 border-2 border-blue-500 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Kết quả Tự Đánh Giá</h2>
            <p className="text-lg font-normal">
              Tự đánh giá kết quả công tác xã hội của bạn trong học kỳ này.
            </p>
            <textarea
              className="mt-4 w-full h-40 p-2 border-2 border-blue-500 rounded"
              placeholder="Nhập kết quả tự đánh giá của bạn ở đây..."
              value={data.selfAssessment || ""}
              readOnly
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
