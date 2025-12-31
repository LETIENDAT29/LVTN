import axios from "axios";

// URL lấy danh sách camera từ trang giao thông HCM
const CAMERA_SOURCE_URL = "https://camera-hcm.eplus.dev/?fullscreen=5a8241105058170011f6eaa6";

// GET /api/cameras
export const getCameras = async (req, res) => {
    try {
        // --------------------------------------------------
        // 1️⃣ GỌI ĐẾN WEBSITE ĐỂ LẤY DANH SÁCH CAMERA
        // --------------------------------------------------
        const response = await axios.get(CAMERA_SOURCE_URL);

        if (!response.data) {
            return res.status(500).json({
                success: false,
                message: "Không lấy được dữ liệu camera từ nguồn"
            });
        }

        const rawData = response.data;

        // --------------------------------------------------
        // 2️⃣ CHUẨN HÓA DỮ LIỆU TRẢ VỀ CHO APP
        // --------------------------------------------------
        const cameras = rawData.map((cam) => ({
            id: cam.CameraID || cam.id,
            name: cam.Name || cam.name || "No Name",
            lat: cam.Lat,
            lng: cam.Lng,
            snapshot: cam.Url || cam.ImageUrl || null,
            stream: cam.StreamUrl || null,
            updatedAt: new Date()
        }));

        // --------------------------------------------------
        // 3️⃣ TRẢ KẾT QUẢ
        // --------------------------------------------------
        return res.status(200).json({
            success: true,
            total: cameras.length,
            cameras
        });

    } catch (err) {
        console.error("Error fetching camera list:", err.message);

        return res.status(500).json({
            success: false,
            message: "Không thể lấy danh sách camera",
            error: err.message
        });
    }
};


// GET /api/cameras/:id
export const getCameraById = async (req, res) => {
    try {
        const { id } = req.params;

        // Gọi nguồn dữ liệu camera
        const response = await axios.get(CAMERA_SOURCE_URL);
        const rawData = response.data;

        const cam = rawData.find(c => c.CameraID == id || c.id == id);

        if (!cam) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy camera"
            });
        }

        const camera = {
            id: cam.CameraID,
            name: cam.Name,
            lat: cam.Lat,
            lng: cam.Lng,
            snapshot: cam.Url,
            stream: cam.StreamUrl || null
        };

        return res.status(200).json({
            success: true,
            camera
        });

    } catch (err) {
        console.error("Error fetching camera:", err);

        return res.status(500).json({
            success: false,
            message: "Không thể lấy camera",
            error: err.message
        });
    }
};
