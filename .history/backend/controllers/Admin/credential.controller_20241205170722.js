const adminCredential = require("../../models/Admin/credential.model.js");

const loginHandler = async (req, res) => {
    let { loginid, password } = req.body;
    try {
        let user = await adminCredential.findOne({ loginid });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Wrong Credentials"
            });
        }

        // So sánh mật khẩu
        if (password !== user.password) {
            return res.status(400).json({
                success: false,
                message: "Wrong Credentials"
            });
        }

        const data = {
            success: true,
            message: "Login Successful!",
            loginid: user.loginid,
            id: user._id,
        };
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const registerHandler = async (req, res) => {
    let { loginid, password } = req.body;
    try {
        let user = await adminCredential.findOne({ loginid });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "Admin With This LoginId Already Exists",
            });
        }

        // Tạo user mới với mật khẩu (không mã hóa)
        user = await adminCredential.create({
            loginid,
            password,
        });

        const data = {
            success: true,
            message: "Register Successful!",
            loginid: user.loginid,
            id: user._id,
        };
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const updateHandler = async (req, res) => {
    try {
        let user = await adminCredential.findByIdAndUpdate(req.params.id, req.body);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No Admin Exists!",
            });
        }
        const data = {
            success: true,
            message: "Updated Successfully!",
        };
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const deleteHandler = async (req, res) => {
    try {
        let user = await adminCredential.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No Admin Exists!",
            });
        }
        const data = {
            success: true,
            message: "Deleted Successfully!",
        };
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = { loginHandler, registerHandler, updateHandler, deleteHandler };
