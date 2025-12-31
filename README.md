
# LVTN – Hệ thống thu thập và quản lý dữ liệu giao thông thông minh
<img width="150" height="370" alt="image" src="https://github.com/user-attachments/assets/96bbd451-cd34-487c-a93b-9b5e5ef6a2ff" />

<img width="150" height="370" alt="image" src="https://github.com/user-attachments/assets/0f6cc0d1-dff6-476b-8337-2062004e28b2" />
<img width="150" height="370" alt="image" src="https://github.com/user-attachments/assets/4a8531e8-c744-4f01-8322-0f5aa97456a6" />


## Giới thiệu

Trong bối cảnh đô thị hóa nhanh chóng, mật độ phương tiện giao thông ngày càng gia tăng đã đặt ra nhiều thách thức đối với công tác quản lý, giám sát và đảm bảo an toàn giao thông. Việc thu thập dữ liệu giao thông ngoài thực địa hiện nay vẫn chủ yếu dựa vào phương pháp thủ công hoặc các hệ thống camera cố định, dẫn đến hạn chế về phạm vi bao phủ, tính cập nhật và chi phí triển khai.

Xuất phát từ thực tiễn đó, dự án **LVTN – Hệ thống thu thập và quản lý dữ liệu giao thông thông minh** được xây dựng với mục tiêu đề xuất và triển khai một giải pháp **tự động hóa quá trình thu thập, xử lý và quản lý dữ liệu giao thông**, kết hợp giữa **ứng dụng di động**, **trí tuệ nhân tạo (AI)** và **hệ thống backend tập trung**. Hệ thống hướng đến việc hỗ trợ các đơn vị quản lý giao thông trong việc theo dõi tình trạng hạ tầng, phát hiện sớm các vấn đề tiềm ẩn và phục vụ công tác phân tích, ra quyết định.

Điểm nổi bật của dự án là việc ứng dụng **AI trong quá trình thu thập dữ liệu ngoài thực địa**, cho phép tự động nhận diện các đối tượng giao thông như chướng ngại vật, hư hỏng mặt đường, biển báo giao thông từ hình ảnh và video. Dữ liệu sau khi được thu thập sẽ được gửi về hệ thống backend để lưu trữ, xử lý và hiển thị trực quan trên bản đồ số, giúp người dùng dễ dàng theo dõi và quản lý.

Về mặt kiến trúc, hệ thống được thiết kế theo mô hình **đa thành phần (multi-system architecture)**, trong đó mỗi thành phần đảm nhiệm một vai trò riêng biệt nhưng vẫn liên kết chặt chẽ với nhau thông qua các API. Toàn bộ mã nguồn của dự án được tổ chức trong một repository duy nhất nhằm thuận tiện cho việc quản lý, phát triển và triển khai. Cụ thể, dự án bao gồm ba thành phần chính:

- **PM_be-service**:  
  Là hệ thống backend đóng vai trò trung tâm, chịu trách nhiệm xử lý nghiệp vụ, cung cấp API cho các ứng dụng phía client, quản lý người dùng, phân quyền truy cập và lưu trữ dữ liệu giao thông. Backend đảm bảo tính nhất quán, bảo mật và khả năng mở rộng của hệ thống.

- **ROADcollector**:  
  Là ứng dụng di động phục vụ công tác thu thập dữ liệu giao thông ngoài thực địa. Ứng dụng tích hợp mô hình **AI (YOLO)** để tự động nhận diện các đối tượng giao thông từ camera thiết bị, giảm thiểu sự phụ thuộc vào thao tác thủ công của người dùng. Dữ liệu thu thập bao gồm hình ảnh/video, vị trí GPS và thông tin nhận diện, sau đó được gửi về backend để xử lý và lưu trữ.

- **ROADmap**:  
  Là ứng dụng quản lý và hiển thị dữ liệu giao thông, cho phép người dùng theo dõi các điểm thu thập trên bản đồ, xem chi tiết thông tin từng vị trí, thống kê dữ liệu và hỗ trợ công tác quản lý, phân tích hiện trạng giao thông.

<img width="200" height="435" alt="image" src="https://github.com/user-attachments/assets/ea4ec73e-c0b5-4c7a-bf7b-8cafda7f9e8d" />
<img width="200" height="435" alt="image" src="https://github.com/user-attachments/assets/ddec8baa-cbfa-4aee-9a73-8192df087889" />
<img width="200" height="435" alt="image" src="https://github.com/user-attachments/assets/966a14ef-08fd-4126-87d9-b637520d9106" />


Dự án không chỉ mang tính nghiên cứu học thuật mà còn hướng đến khả năng **ứng dụng thực tiễn**, có thể mở rộng và tích hợp thêm các chức năng trong tương lai như phân tích dữ liệu lớn (Big Data), dự báo nguy cơ tai nạn giao thông hoặc kết nối với các hệ thống giao thông thông minh (ITS) hiện có. Thông qua dự án này, nhóm thực hiện mong muốn góp phần đề xuất một giải pháp công nghệ nhằm nâng cao hiệu quả quản lý và đảm bảo an toàn giao thông trong môi trường đô thị hiện đại.
📁 Cấu Trúc Dự Án
```text
LVTN/
├─ PM_be-service/
│  ├─ config/
│  ├─ node_modules/
│  ├─ src/
│  ├─ .env
│  ├─ .sequelizerc
│  ├─ package.json
│  └─ package-lock.json
│
├─ ROADcollector/
│  └─ ex/
│     ├─ .idea/
│     ├─ .kotlin/
│     ├─ app/
│     │  ├─ build/
│     │  └─ src/
│     │     ├─ androidTest/
│     │     ├─ test/
│     │     └─ main/
│     │        ├─ assets/
│     │        ├─ java/com/example/roadcollector/
│     │        │  ├─ camera/        # Xử lý camera, preview, analyzer
│     │        │  ├─ collect/       # Luồng thu thập dữ liệu
│     │        │  ├─ data/          # Model, repository, datasource
│     │        │  ├─ di/            # Dependency Injection
│     │        │  ├─ home/          # Màn hình chính
│     │        │  ├─ location/      # GPS, vị trí người dùng
│     │        │  ├─ login/         # Đăng nhập / xác thực
│     │        │  ├─ navigation/    # Điều hướng trong ứng dụng
│     │        │  ├─ ui/            # UI (Jetpack Compose)
│     │        │  ├─ utils/         # Tiện ích dùng chung
│     │        │  ├─ yolov8/        # AI YOLOv8 (nhận diện đối tượng)
│     │        │  ├─ App.kt
│     │        │  ├─ MainActivity.kt
│     │        │  └─ TestDecode.kt
│     │        ├─ res/              # Layout, drawable, values
│     │        └─ AndroidManifest.xml
│     │
│     ├─ .gitignore
│     └─ build.gradle.kts
│
├─ ROADmap/
│  ├─ .vscode/
│  ├─ app/
│  │  ├─ (tabs)/
│  │  ├─ component/
│  │  ├─ profile/
│  │  ├─ screens/
│  │  ├─ styles/
│  │  ├─ _layout.tsx
│  │  └─ modal.tsx
│  ├─ assets/
│  ├─ components/
│  ├─ constants/
│  ├─ hooks/
│  ├─ scripts/
│  ├─ src/
│  ├─ .gitignore
│  ├─ app.json
│  ├─ eas.json
│  └─ eslint.config.js
│
└─ README.md

...
Authentication
POST /api/auth/register - Đăng ký
POST /api/auth/login - Đăng nhập
GET /api/auth/me - Lấy thông tin user

Detection
POST /api/detection - Vị trí vật thể
GET /api/object-  lấy vị trí vật thể
...

Decode YOLO
Input shape = (1, 640, 640, 3)
Output shape = (1, C, N)

chỉ số Intersection over Union (IoU)
<img width="268" height="80" alt="image" src="https://github.com/user-attachments/assets/5a8844a1-d401-4264-bc7e-79a0104036d7" />




