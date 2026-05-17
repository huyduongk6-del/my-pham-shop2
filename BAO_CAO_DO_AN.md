# BÁO CÁO ĐỒ ÁN MÔN HỌC
**Đề tài:** Xây dựng nền tảng Thương mại Điện tử Mỹ phẩm Cao cấp (Premium E-Commerce) - **Beauty Luxe**

---

## I. GIỚI THIỆU CHUNG

**1. Tên dự án:** Beauty Luxe Korea (뷰티럭스 코리아)
**2. Mục tiêu dự án:** 
Phát triển một website thương mại điện tử chuyên cung cấp các sản phẩm làm đẹp, mỹ phẩm và nước hoa cao cấp. Hệ thống được thiết kế theo chuẩn UI/UX của các thương hiệu xa xỉ (luxury brands), tối ưu hóa trải nghiệm người dùng với các tương tác mượt mà và giao diện hiện đại.

## II. CÔNG NGHỆ SỬ DỤNG

Dự án được xây dựng hoàn toàn dựa trên các công nghệ Front-end hiện đại nhất:
*   **Core Framework:** React.js (Vite) - Xây dựng giao diện hướng component (Component-based), đảm bảo hiệu suất render nhanh chóng.
*   **Styling (Giao diện):** Tailwind CSS - Quản lý CSS Utility-first, giúp xây dựng giao diện tùy chỉnh, responsive (tương thích mọi thiết bị) một cách linh hoạt.
*   **Routing (Điều hướng):** React Router DOM - Quản lý chuyển trang mượt mà (Single Page Application - SPA) không cần tải lại toàn bộ trang web.
*   **State Management (Quản lý trạng thái):** React Context API kết hợp Custom Hooks (quản lý Giỏ hàng, Danh sách yêu thích, Đăng nhập, Trạng thái thông báo).
*   **Icon System:** Lucide React - Bộ thư viện icon vector sắc nét, đồng bộ.

## III. CÁC TÍNH NĂNG NỔI BẬT ĐÃ TRIỂN KHAI

Dự án vượt qua mức cơ bản của một website thông thường bằng việc tích hợp hàng loạt tính năng UI/UX nâng cao:

### 1. Trải nghiệm người dùng (UX) Cao cấp
*   **Page Transitions & Skeleton Loading:** Áp dụng hiệu ứng fade-in mượt mà khi chuyển đổi giữa các trang. Trong thời gian chờ dữ liệu tải, hệ thống sử dụng Skeleton Loader (Khối xám chuyển động) để giữ nguyên bố cục thay vì dùng biểu tượng xoay tròn nhàm chán.
*   **Live Search (Tìm kiếm trực tiếp):** Tính năng tìm kiếm thông minh dạng Full-screen Modal. Hiển thị kết quả (tên, hình ảnh, giá) trực tiếp ngay khi người dùng gõ từ khóa mà không cần nhấn Enter hay đổi trang.
*   **Quick View (Xem nhanh sản phẩm):** Cho phép xem thông tin chi tiết và thêm vào giỏ hàng thông qua một Pop-up ngay trên trang danh sách mà không cần chuyển hướng.
*   **Sticky Add-to-Cart:** Thanh mua sắm trượt bám dính dọc theo màn hình khi người dùng cuộn xem chi tiết sản phẩm dài, giúp thao tác chốt đơn nhanh chóng.

### 2. Tính năng Thương mại Điện tử cốt lõi
*   **Giỏ hàng (Cart) & Thanh toán (Checkout):** 
    * Quản lý trạng thái giỏ hàng theo thời gian thực (Real-time).
    * Mini-cart hiển thị dạng Drawer trượt từ cạnh phải màn hình.
    * Quy trình Checkout hoàn chỉnh với form điền thông tin và trang Xác nhận thành công (Order Success).
*   **Hồ sơ Cá nhân & Tiến trình VIP (MyPage):** 
    * Giao diện theo dõi chi tiêu cá nhân bằng thanh Progress Bar trực quan.
    * Lịch sử tương tác và danh sách sản phẩm yêu thích (Wishlist).
*   **Vừa xem gần đây (Recently Viewed):** Tracking (theo dõi) sản phẩm khách hàng vừa nhấp vào và gợi ý lại trên màn hình trang chủ/trang cá nhân.
*   **Đa ngôn ngữ & Đa tiền tệ (UI Switcher):** Thanh TopBar chuẩn Quốc tế hỗ trợ giả lập chuyển đổi Ngôn ngữ (Hàn/Anh/Việt) và Tiền tệ.

## IV. CẤU TRÚC THƯ MỤC DỰ ÁN (PROJECT STRUCTURE)

Dự án được phân chia theo kiến trúc module chuẩn mực của React:
```text
src/
 ├── components/       # Các thành phần tái sử dụng (UI Components)
 │   ├── common/       # (Nút bấm, Toast, Slider, Skeleton, PageTransition)
 │   ├── layout/       # (Header, Footer, TopBar, Newsletter)
 │   ├── product/      # (ProductCard, QuickView, ProductList)
 │   └── popup/        # (MemberBenefitPopup)
 ├── context/          # Quản lý State toàn cục (CartContext, AuthContext, WishlistContext)
 ├── pages/            # Màn hình chính (Home, ProductDetail, Cart, Checkout, MyPage,...)
 ├── data/             # Dữ liệu giả lập (Mockup data products)
 ├── utils/            # Các hàm hỗ trợ (Format tiền tệ, tính toán)
 ├── index.css         # Reset CSS, khai báo Keyframes Animation & cấu hình Tailwind
 └── App.jsx           # Component gốc cấu hình Routing và Providers
```

## V. ĐÁNH GIÁ VÀ KẾT LUẬN
Dự án **Beauty Luxe** đã đáp ứng đầy đủ và xuất sắc các tiêu chí của một ứng dụng Front-end hiện đại. Việc áp dụng các kỹ thuật thiết kế Micro-interactions (tương tác vi mô) và State Management khắt khe chứng minh được khả năng vận dụng ngôn ngữ lập trình linh hoạt để tạo ra một sản phẩm có tính thương mại cao, sẵn sàng phục vụ nhu cầu thực tế.

---
**Hướng dẫn chạy dự án trên máy tính cá nhân (Localhost):**
1. Đảm bảo đã cài đặt Node.js.
2. Mở Terminal tại thư mục gốc của dự án.
3. Chạy lệnh: `npm install` (Để cài đặt thư viện phụ thuộc).
4. Chạy lệnh: `npm run dev` (Để khởi động máy chủ).
5. Truy cập đường link xuất hiện trên Terminal (thường là http://localhost:5173/) để xem ứng dụng.
