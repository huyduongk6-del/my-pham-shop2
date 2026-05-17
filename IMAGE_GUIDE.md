# Beauty Luxe - Hướng dẫn quản lý Hình ảnh (Image Asset Guide)

Tài liệu này hỗ trợ bạn dễ dàng cập nhật và quản lý toàn bộ tài nguyên hình ảnh cho website của mình, đảm bảo giao diện sang trọng chuẩn **Korean Premium**.

---

## 📁 1. Cấu trúc Thư mục Ảnh

Tất cả hình ảnh của trang web nằm trong thư mục `/public/images/`. Dưới đây là cách tổ chức thư mục cụ thể:

### 📍 Danh mục chung (Category Icons)
- Thư mục: `/public/images/categories/`
- Ảnh kích thước chuẩn: vuông `1:1` (ví dụ: `500x500px`), nên tách nền hoặc có nền sáng nhẹ (`#FAF7F2`).

### 📍 Sản phẩm Chanel chính hãng
- Thư mục: `/public/images/chanel/`
- Các ảnh từ `chanel-1.png` đến `chanel-12.png`.
- Khuyến nghị: Định dạng `.png`, hình ảnh sản phẩm nằm giữa, tách nền/nền trắng.

### 📍 Ảnh Banner đầu trang Danh mục (Hero Images)
Vui lòng sao chép các ảnh bìa cao cấp vào thư mục này:
- Thư mục mới: `/public/images/pages/`
- **Kích thước đề xuất:** `1600 x 900 px` (Hoặc tỷ lệ ngang tối thiểu `4:3` sắc nét cao).
- Các ảnh đề xuất:
  - `makeup-hero.png`: Banner trang Điểm trang (Makeup).
  - `skincare-hero.png`: Banner trang Dưỡng da (Skincare).
  - `gift-hero.png`: Banner trang Quà tặng (Gift Set Landing Hero).
  - `best-seller-hero.png`: Banner trang Bán chạy (Best Seller).
  - `sale-hero.png`: Banner trang Khuyến mãi (Special Offers).
  - `contact-hero.png`: Banner trang Liên hệ hỗ trợ (Contact).

### 📍 Bộ sưu tập Hộp Quà Tặng (Gift Box Collections)
Vui lòng lưu ảnh các combo quà tặng (với nơ đen Chanel sang trọng) tại đây:
- Thư mục mới: `/public/images/gifts/`
- **Kích thước đề xuất:** `1000 x 1000 px` (Hoặc `1200 x 900 px` vuông/chữ nhật gọn).
- Khuyến nghị ảnh vuông sản phẩm đặt trong túi/hộp giấy Chanel, tách nền.
  - `gift-1.png`: Set Nước hoa & Son cao cấp (Fragrance & Lip Gift Set).
  - `gift-2.png`: Set Chăm sóc da cao cấp (Skincare Ritual Gift Set).
  - `gift-3.png`: Set Trang điểm mỗi ngày (Daily Makeup Gift Set).
  - `gift-4.png`: Hộp quà Premium VIP giới hạn (Premium Gift Box).
  - `gift-5.png`: Set quà tặng Mademoiselle quyến rũ (Coco Mademoiselle Gift Set).
  - `gift-6.png`: Set trang điểm Mini tinh gọn (Luxury Mini Beauty Set).

### 📍 Sản phẩm Trang Điểm (Makeup Products)
Vui lòng lưu trữ hình ảnh các dòng mỹ phẩm trang điểm (Son, Phấn, Nền, Mascara) tại đây:
- Thư mục mới: `/public/images/makeup/`
- **Kích thước đề xuất:** `1000 x 1000 px` (Tối thiểu `800 x 800 px` vuông vức, tách nền/nền trong suốt).
- Danh sách tên file tương ứng:
  - `makeup-1.png`: Son Rouge Coco Bloom.
  - `makeup-2.png`: Son Rouge Allure Velvet.
  - `makeup-3.png`: Kem nền Les Beiges Foundation.
  - `makeup-4.png`: Kem nền Ultra Le Teint Foundation.
  - `makeup-5.png`: Mascara Le Volume de Chanel.
  - `makeup-6.png`: Phấn phủ Les Beiges Healthy Glow Powder.
  - `makeup-7.png`: Phấn bắt sáng Baume Essentiel.
  - `makeup-8.png`: Bút kẻ mắt Stylo Yeux Waterproof.

### 📍 Sản phẩm Chăm Sóc Da (Skincare Products)
Vui lòng lưu trữ hình ảnh dòng dưỡng da Chanel (Serum, Kem dưỡng, Sữa rửa mặt, Kem chống nắng) tại đây:
- Thư mục mới: `/public/images/skincare/`
- **Kích thước đề xuất:** `1000 x 1000 px` (Hoặc `800 x 800 px` sắc nét, nền trong suốt).
- Danh sách file tương ứng:
  - `skincare-1.png`: Tinh chất Hydra Beauty Micro Sérum.
  - `skincare-2.png`: Kem dưỡng cao cấp Sublimage La Crème.
  - `skincare-3.png`: Sữa rửa mặt La Mousse Cleanser.
  - `skincare-4.png`: Kem nước Hydra Beauty Camellia Water Cream.
  - `skincare-5.png`: Tinh chất nâng cơ Le Lift Sérum.
  - `skincare-6.png`: Kem dưỡng nâng cơ Le Lift Crème.
  - `skincare-7.png`: Tinh chất đỏ N°1 de Chanel Revitalizing Serum.
  - `skincare-8.png`: Kem chống nắng UV Essentiel Sunscreen.

### 📍 Ảnh câu chuyện sản phẩm (Editorial Skincare Story)
- Vị trí: `/public/images/pages/skincare-story.png`
- **Kích thước đề xuất:** `1400 x 800 px` (Dạng ảnh banner ngang, phong cách tạp chí sang trọng).

### 📍 Sản phẩm Khuyến mãi / Ưu đãi (Sale / Special Benefit Products)
Vui lòng lưu trữ hình ảnh dành cho trang sự kiện/ưu đãi đặc biệt tại đây:
- Thư mục mới: `/public/images/sale/`
- **Kích thước đề xuất:** `1000 x 1000 px` (Hoặc `800 x 800 px` nền trong suốt/trắng đồng bộ).
- Danh sách file tương ứng:
  - `sale-1.png`: Chanel N°5 EDP (Phiên bản Sale).
  - `sale-2.png`: Coco Mademoiselle EDP (Phiên bản Sale).
  - `sale-3.png`: Rouge Coco Bloom (Phiên bản Sale).
  - `sale-4.png`: Les Beiges Foundation (Phiên bản Sale).
  - `sale-5.png`: Hydra Beauty Micro Sérum (Phiên bản Sale).
  - `sale-6.png`: La Mousse Cleanser (Phiên bản Sale).
  - `sale-7.png`: Fragrance & Lip Gift Set (Phiên bản Sale).
  - `sale-8.png`: Luxury Mini Beauty Set (Phiên bản Sale).

### 📍 Thương hiệu Cao cấp (Luxury Brands)
- Thư mục mới: `/public/images/brands/`
- **Kích thước đề xuất:** `800 x 500 px` (Dạng ảnh logo/typography cách điệu thương hiệu).
- Các tên file tương ứng:
  - `chanel.png`
  - `dior.png`
  - `ysl.png`
  - `armani.png`
  - `estee-lauder.png`
  - `lancome.png`
  - `clarins.png`
  - `la-mer.png`
  - `tom-ford.png`
  - `gucci.png`

### 📍 Bộ sưu tập Sản phẩm Toàn cầu (Global Multi-Brand Products)
- Thư mục mới: `/public/images/global-products/`
- **Kích thước đề xuất:** `1000 x 1000 px` (Hoặc tối thiểu `800 x 800 px` vuông, tách nền).
- Các tên file tương ứng từ `product-1.png` đến `product-40.png`.

### 📍 Thư viện ảnh Sản phẩm (Product Image Gallery)
Để tăng tính cao cấp cho trang Chi tiết sản phẩm, bạn có thể thêm nhiều ảnh phụ cho mỗi sản phẩm.
- **Kích thước đề xuất:** `1000 x 1000 px` (Tỷ lệ `1:1`, nền trong suốt hoặc trắng `#FFFFFF`).
- **Quy tắc đặt tên:** Tên ảnh chính + số thứ tự.
- **Ví dụ sản phẩm `chanel-1`:**
  - `chanel-1.png` (Ảnh chính)
  - `chanel-1-2.png` (Ảnh phụ 1)
  - `chanel-1-3.png` (Ảnh phụ 2)
  - `chanel-1-4.png` (Ảnh phụ 3)
- **Ví dụ sản phẩm `makeup-1`:**
  - `makeup-1.png` (Ảnh chính)
  - `makeup-1-2.png` (Ảnh phụ 1)
  - `makeup-1-3.png` (Ảnh phụ 2)
- **Lưu ý:** Sản phẩm nên nằm chính giữa khung hình, có padding khoảng 10-15% xung quanh để không bị sát mép khung gallery.

### 📍 Ảnh Popup Ưu đãi Thành viên (Membership Offer Popup)
- Thư mục: `/public/images/popup/`
- **Kích thước đề xuất:** `800 x 800 px` (Tách nền hoặc PNG/WebP có alpha channel).
- Tên file mặc định:
  - `member-gift.png`: Visual hộp quà 10% OFF nằm ở dải bên phải popup.

### 📍 Trang Chủ & 에디토리얼 (Home Editorial Content)
Vui lòng lưu trữ hình ảnh phục vụ phần giới thiệu câu chuyện thương hiệu và gợi ý sản phẩm tiêu biểu hàng ngày tại đây:
- Thư mục mới: `/public/images/home/`
- Danh sách các file bắt buộc:
  - `beauty-story.png`: Ảnh đại diện đại diện Thương hiệu cho mục **BEAUTY LUXE STORY** (Đề xuất: Tỷ lệ đứng `4:5`, kích thước `1200 x 1500 px` hoặc ngang `1400 x 900 px`).
  - `pick-perfume.png`: Ảnh Nước hoa nổi bật trong ngày (Đề xuất: Tỷ lệ vuông `1:1`, kích thước `1000 x 1000 px`).
  - `pick-lip.png`: Ảnh dòng Son gợi ý trong ngày (Đề xuất: `1000 x 1000 px`).
  - `pick-skincare.png`: Ảnh dòng Dưỡng da khuyên dùng trong ngày (Đề xuất: `1000 x 1000 px`).
  - `gift-preview.png`: Ảnh quảng bá chương trình Quà tặng cao cấp (Đề xuất: Tỷ lệ `16:9` hoặc `4:3`, kích thước `1400 x 900 px` hoặc `1600 x 900 px`).

---


## ⚙️ 2. Hỗ trợ Tự phục hồi Layout (Auto Fallback)

Nếu bạn chưa chuẩn bị kịp hình ảnh cho các thư mục trên:
1. **Hệ thống sẽ KHÔNG bị lỗi (No Crash).**
2. **Hero Banner** sẽ tự động chuyển sang nền màu ngà (Ivory) phối hợp dải màu kem ngọc trai (Beige gradient) và logo typography mờ cực sang trọng.
3. **Thẻ Combo Quà tặng** và **Thẻ Sản phẩm** sẽ tự động hiển thị text chữ cái đầu thương hiệu sang trọng trên nền ivory mềm mại nếu thiếu ảnh.

## 💡 3. Bí quyết chuẩn Korean Premium Style
- Sử dụng ảnh có độ phân giải cao, dung lượng nhỏ (tối ưu WebP hoặc PNG nén).
- Màu sắc trong ảnh nên thiên về tông ấm nhẹ (Warm Tone), be nhạt (Beige), trắng ngà (Ivory), tone đen thanh lịch.
- Tránh sử dụng các ảnh quá lòe loẹt, nhiều màu sặc sỡ, hoặc viền chữ phức tạp đè lên ảnh.
