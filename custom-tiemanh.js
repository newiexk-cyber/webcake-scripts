/**
 * Tiệm Ảnh Trái Thơm - Hệ thống Script giao diện và tính năng Concept nâng cao
 * Tác giả: Antigravity
 * Chức năng: Tạo giao diện Landing Page chuyên nghiệp, lọc danh mục, xem album ảnh dạng Lightbox, đăng ký lịch tư vấn/chụp ảnh.
 */

(function () {
    // Cấu hình linh hoạt cho Webcake / Landing Page tĩnh
    const CONFIG = {
        webhookUrl: "", // Nhập link Webhook (Google Sheets, Pancake POS) để gửi data khách hàng
        redirectUrl: "", // Đường dẫn trang Cảm ơn nếu muốn chuyển hướng
        targetId: "w-naljqcdc", // ID phần tử trên Webcake để chèn giao diện
        // 🔑 ID của Google Sheet quản lý concept (nhân viên sửa tại đây)
        // Lấy từ URL: https://docs.google.com/spreadsheets/d/[ID Ở ĐÂY]/edit
        sheetId: "1hhUOljIvpXuVo0U0b0H0Pu6SVon3mPADD8yXRlnddg8",
        sheetName: "concepts_template_clean" // Tên tab sheet của bạn
    };

    // 1. Dữ liệu từng Concept cụ thể (mỗi card = 1 concept riêng biệt)
    const CONCEPTS = [
        // ─── NỮ TÍNH ───────────────────────────────────────────────
        {
            id: 1, title: "Nàng Thơ Hoa Đào", category: "nutinh",
            tag: "Nữ Tính", icon: "🌸", iconColor: "#ff758f", bgColor: "rgba(255,117,143,0.1)",
            images: [
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80",
                "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
                "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
                "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&q=80",
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
                "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
                "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80"
            ],
            description: "Tôn vinh nét dịu dàng, trong trẻo của phái đẹp. Bối cảnh hoa anh đào rực rỡ, rèm trắng đón nắng mai nhẹ nhàng kết hợp váy lụa bồng bềnh giúp bạn hóa thân thành nàng thơ mộng."
        },
        {
            id: 2, title: "Tiên Nữ Mùa Hè", category: "nutinh",
            tag: "Nữ Tính", icon: "🌸", iconColor: "#ff758f", bgColor: "rgba(255,117,143,0.1)",
            images: [
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
                "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80",
                "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
                "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80",
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
                "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
                "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&q=80"
            ],
            description: "Vẻ đẹp trong veo mùa hè với váy trắng, ánh nắng vàng và những đóa hoa dại khoe sắc. Concept nhẹ nhàng, tươi tắn và đầy sức sống."
        },
        {
            id: 3, title: "Áo Dài Phố Cổ", category: "nutinh",
            tag: "Nữ Tính", icon: "👗", iconColor: "#e6b800", bgColor: "rgba(230,184,0,0.1)",
            images: [
                "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=800&q=80",
                "https://images.unsplash.com/photo-1588001400947-6385aef4ab0e?w=400&q=80",
                "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=400&q=80",
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80",
                "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80",
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
                "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
                "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&q=80",
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80"
            ],
            description: "Tà áo dài thướt tha giữa những con phố rêu phong cổ kính, hoa giấy đỏ rực và đèn lồng lung linh — vẻ đẹp thuần Việt đầy hoài niệm."
        },
        {
            id: 4, title: "Cổ Trang Tiên Tử", category: "nutinh",
            tag: "Nữ Tính", icon: "🏮", iconColor: "#7209b7", bgColor: "rgba(114,9,183,0.1)",
            images: [
                "https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&q=80",
                "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=400&q=80",
                "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&q=80",
                "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?w=400&q=80",
                "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=400&q=80",
                "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80",
                "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=400&q=80",
                "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80",
                "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&q=80",
                "https://images.unsplash.com/photo-1472214222555-d4e5fbf4ea6e?w=400&q=80"
            ],
            description: "Hóa thân thành tiên tử chốn bồng lai với hán phục thêu họa tiết tỉ mỉ, trâm cài lấp lánh và quạt giấy cổ kính giữa không gian mây khói huyền ảo."
        },
        // ─── CÁ TÍNH ───────────────────────────────────────────────
        {
            id: 5, title: "Street Style Noir", category: "catinh",
            tag: "Cá Tính", icon: "⭐", iconColor: "#b5179e", bgColor: "rgba(181,23,158,0.1)",
            images: [
                "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
                "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&q=80",
                "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
                "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80",
                "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&q=80",
                "https://images.unsplash.com/photo-1496449903678-c8dd7459a22b?w=400&q=80",
                "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=400&q=80",
                "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&q=80",
                "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?w=400&q=80",
                "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&q=80"
            ],
            description: "Cool ngầu và phá cách giữa đường phố đêm. Trang phục da bóng bẩy, vest đen sắc sảo, makeup mắt khói cuốn hút — thể hiện trọn vẹn cá tính độc đáo của bạn."
        },
        {
            id: 6, title: "Punk & Edgy", category: "catinh",
            tag: "Cá Tính", icon: "⭐", iconColor: "#b5179e", bgColor: "rgba(181,23,158,0.1)",
            images: [
                "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
                "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80",
                "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&q=80",
                "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&q=80",
                "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?w=400&q=80",
                "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&q=80",
                "https://images.unsplash.com/photo-1496449903678-c8dd7459a22b?w=400&q=80",
                "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&q=80",
                "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=400&q=80",
                "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80"
            ],
            description: "Phong cách Punk mạnh mẽ, nổi loạn với phụ kiện sắc bén, tóc sáng tạo và biểu cảm đầy nội lực. Dành cho người dám là chính mình."
        },
        {
            id: 7, title: "Noel Mùa Đông", category: "catinh",
            tag: "Cá Tính", icon: "🎄", iconColor: "#d62828", bgColor: "rgba(214,40,40,0.1)",
            images: [
                "https://images.unsplash.com/photo-1545048702-79362596cdc9?w=800&q=80",
                "https://images.unsplash.com/photo-1577043848358-4638accd988c?w=400&q=80",
                "https://images.unsplash.com/photo-1512474929763-f43c802e374c?w=400&q=80",
                "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&q=80",
                "https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?w=400&q=80",
                "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&q=80",
                "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&q=80",
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
                "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80",
                "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&q=80"
            ],
            description: "Concept Noel ngập tràn sắc đỏ an lành. Cây thông lấp lánh, lò sưởi ấm cúng và mũ len xinh xắn tạo nên bức ảnh mùa Giáng Sinh đáng nhớ."
        },
        // ─── COUPLE ───────────────────────────────────────────────
        {
            id: 8, title: "Hoàng Hôn Đôi Lứa", category: "couple",
            tag: "Couple", icon: "💖", iconColor: "#ff477e", bgColor: "rgba(255,71,126,0.1)",
            images: [
                "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80",
                "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80",
                "https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?w=400&q=80",
                "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&q=80",
                "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=400&q=80",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80",
                "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80",
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80"
            ],
            description: "Ghi lại những khoảnh khắc tình yêu tự nhiên, ấm áp dưới ánh hoàng hôn vàng rực. Từ cái nắm tay siết chặt đến những nụ cười không che giấu được."
        },
        {
            id: 9, title: "Café Tình Yêu", category: "couple",
            tag: "Couple", icon: "💖", iconColor: "#ff477e", bgColor: "rgba(255,71,126,0.1)",
            images: [
                "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
                "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&q=80",
                "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=400&q=80",
                "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&q=80",
                "https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?w=400&q=80",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80",
                "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80"
            ],
            description: "Buổi hẹn nhẹ nhàng bên tách cà phê thơm nồng. Không gian quán nhỏ ấm cúng, ánh đèn vàng và bầu không khí riêng tư tạo nên những khoảnh khắc ngọt ngào."
        },
        {
            id: 10, title: "Tết Đoàn Viên", category: "couple",
            tag: "Couple", icon: "🧧", iconColor: "#e63946", bgColor: "rgba(230,57,70,0.1)",
            images: [
                "https://images.unsplash.com/photo-1610471926615-d4e5fbf4ea6e?w=800&q=80",
                "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=80",
                "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&q=80",
                "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=400&q=80",
                "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80",
                "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&q=80",
                "https://images.unsplash.com/photo-1472214222555-d4e5fbf4ea6e?w=400&q=80",
                "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80",
                "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80",
                "https://images.unsplash.com/photo-1500627869374-13cd993b1115?w=400&q=80"
            ],
            description: "Phông nền đỏ hoa đào rạng rỡ, lì xì may mắn, áo dài tân thời — couple đón Tết trong không gian truyền thống ấm áp và đầy tình yêu thương."
        },
        // ─── GIA ĐÌNH ───────────────────────────────────────────────
        {
            id: 11, title: "Gia Đình Hạnh Phúc", category: "giadinh",
            tag: "Gia Đình", icon: "🏠", iconColor: "#f77f00", bgColor: "rgba(247,127,0,0.1)",
            images: [
                "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80",
                "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&q=80",
                "https://images.unsplash.com/photo-1542037104857-ffbe04840d67?w=400&q=80",
                "https://images.unsplash.com/photo-1581579438747-1dc8d1e0ca96?w=400&q=80",
                "https://images.unsplash.com/photo-1484665754804-74b091211472?w=400&q=80",
                "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80",
                "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&q=80",
                "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&q=80",
                "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&q=80",
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80"
            ],
            description: "Những nụ cười hạnh phúc, cái ôm đầy yêu thương giữa các thành viên trong gia đình. Chụp tự nhiên, ghi lại những khoảnh khắc bình dị mà trân quý nhất."
        },
        {
            id: 12, title: "Picnic Gia Đình", category: "giadinh",
            tag: "Gia Đình", icon: "🏠", iconColor: "#f77f00", bgColor: "rgba(247,127,0,0.1)",
            images: [
                "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80",
                "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&q=80",
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
                "https://images.unsplash.com/photo-1542037104857-ffbe04840d67?w=400&q=80",
                "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&q=80",
                "https://images.unsplash.com/photo-1581579438747-1dc8d1e0ca96?w=400&q=80",
                "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&q=80",
                "https://images.unsplash.com/photo-1484665754804-74b091211472?w=400&q=80",
                "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80",
                "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&q=80"
            ],
            description: "Cả nhà cùng picnic trên thảm cỏ xanh mướt dưới bầu trời trong xanh. Tấm chăn kẻ sọc, giỏ mây đựng đồ ăn và tiếng cười rộn ràng — khoảnh khắc bình yên tuyệt vời."
        },
        // ─── KỶ YẾU ───────────────────────────────────────────────
        {
            id: 13, title: "Kỷ Yếu Sân Trường", category: "kyyeu",
            tag: "Kỷ Yếu", icon: "🎓", iconColor: "#2a9d8f", bgColor: "rgba(42,157,143,0.1)",
            images: [
                "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
                "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&q=80",
                "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&q=80",
                "https://images.unsplash.com/photo-1525921429624-479b6c294a40?w=400&q=80",
                "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?w=400&q=80",
                "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&q=80",
                "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&q=80",
                "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
                "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&q=80",
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80"
            ],
            description: "Lưu giữ khoảnh khắc thanh xuân rực rỡ dưới nắng sân trường. Áo đồng phục, mũ cử nhân, bóng bay rực rỡ — những khoảnh khắc cuối cấp không bao giờ quên."
        },
        {
            id: 14, title: "Kỷ Yếu Studio", category: "kyyeu",
            tag: "Kỷ Yếu", icon: "🎓", iconColor: "#2a9d8f", bgColor: "rgba(42,157,143,0.1)",
            images: [
                "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80",
                "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=80",
                "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&q=80",
                "https://images.unsplash.com/photo-1525921429624-479b6c294a40?w=400&q=80",
                "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&q=80",
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
                "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&q=80",
                "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&q=80",
                "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?w=400&q=80",
                "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80"
            ],
            description: "Chân dung kỷ yếu chuyên nghiệp tại studio với ánh sáng được kiểm soát hoàn hảo. Ảnh rõ nét, màu sắc chân thực, tôn lên vẻ đẹp tự nhiên của từng bạn."
        },
        // ─── PROFILE ───────────────────────────────────────────────
        {
            id: 15, title: "Business Portrait", category: "profile",
            tag: "Profile", icon: "👤", iconColor: "#4361ee", bgColor: "rgba(67,97,238,0.1)",
            images: [
                "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80",
                "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
                "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
                "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
                "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80",
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80",
                "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80",
                "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80"
            ],
            description: "Chân dung doanh nhân chuyên nghiệp, tự tin. Ánh sáng studio cao cấp tôn lên khí chất uy tín, phục vụ cho hồ sơ năng lực và thương hiệu cá nhân."
        },
        {
            id: 16, title: "Ngoại Cảnh Tự Nhiên", category: "profile",
            tag: "Profile", icon: "🍃", iconColor: "#4f772d", bgColor: "rgba(79,119,45,0.1)",
            images: [
                "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80",
                "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=400&q=80",
                "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=80",
                "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80",
                "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80",
                "https://images.unsplash.com/photo-1500627869374-13cd993b1115?w=400&q=80",
                "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80",
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
                "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80",
                "https://images.unsplash.com/photo-1472214222555-d4e5fbf4ea6e?w=400&q=80"
            ],
            description: "Chân dung ngoại cảnh giữa thiên nhiên khoáng đạt. Đồi thông mộng mơ, cánh đồng hoa hay bờ hồ hoàng hôn mang lại vẻ đẹp lãng mạn và đầy sức sống."
        },
        {
            id: 17, title: "Studio Tối Giản", category: "profile",
            tag: "Profile", icon: "📷", iconColor: "#1d3557", bgColor: "rgba(29,53,87,0.1)",
            images: [
                "https://images.unsplash.com/photo-1554080353-a576cf803bda?w=800&q=80",
                "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&q=80",
                "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
                "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80",
                "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=400&q=80",
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80",
                "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80",
                "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80"
            ],
            description: "Chân dung nghệ thuật trên phông nền đơn sắc xám/đen/trắng. Tập trung vào đường nét khuôn mặt, biểu cảm tự nhiên và hiệu ứng ánh sáng chuyên sâu."
        }
    ];

    const STYLES = `
        :root {
            --tiemanh-font: 'Be Vietnam Pro', sans-serif;
            --tiemanh-serif: 'Playfair Display', serif;
            --tiemanh-cursive: 'Playfair Display', serif;
            
            --tiemanh-primary: #fbc02d;
            --tiemanh-primary-dark: #f9a825;
            --tiemanh-primary-light: #fff59d;
            
            --tiemanh-dark: #1e1e24;
            --tiemanh-dark-soft: #2d2d35;
            --tiemanh-bg: #fffbf0;
            --tiemanh-text: #3c3c43;
            --tiemanh-text-light: #7c7c8a;
            --tiemanh-white: #ffffff;
            
            --tiemanh-shadow-sm: 0 4px 10px rgba(0, 0, 0, 0.03);
            --tiemanh-shadow-md: 0 10px 30px rgba(0, 0, 0, 0.06);
            --tiemanh-shadow-lg: 0 20px 40px rgba(251, 192, 45, 0.15);
            --tiemanh-transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
            --tiemanh-border-radius: 16px;
        }

        #tiemanh-root {
            font-family: var(--tiemanh-font);
            background-color: var(--tiemanh-bg);
            color: var(--tiemanh-text);
            margin: 0;
            padding: 0;
            line-height: 1.6;
            min-height: 100vh;
            overflow-x: hidden;
            position: relative;
        }

        /* Hiệu ứng bóng mờ màu sắc trôi nổi nghệ thuật ở nền (Mesh Gradient) */
        .tiemanh-bg-blob {
            position: absolute;
            width: 600px;
            height: 600px;
            border-radius: 50%;
            filter: blur(130px);
            opacity: 0.15;
            z-index: 0;
            pointer-events: none;
            animation: floatBlob 25s infinite alternate ease-in-out;
        }
        .tiemanh-bg-blob.pink {
            background: radial-gradient(circle, #ff80ab 0%, rgba(255,128,171,0) 70%);
            top: -150px;
            right: -100px;
            animation-delay: 0s;
        }
        .tiemanh-bg-blob.yellow {
            background: radial-gradient(circle, #ffe082 0%, rgba(255,224,130,0) 70%);
            bottom: 25%;
            left: -200px;
            animation-delay: -6s;
        }
        .tiemanh-bg-blob.peach {
            background: radial-gradient(circle, #ffab91 0%, rgba(255,171,145,0) 70%);
            top: 40%;
            right: -150px;
            animation-delay: -12s;
        }
        @keyframes floatBlob {
            0% {
                transform: translate(0, 0) scale(1) rotate(0deg);
            }
            100% {
                transform: translate(80px, 40px) scale(1.12) rotate(45deg);
            }
        }

        /* 1. Header (Navbar) */
        .tiemanh-navbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 18px 8%;
            background: rgba(255, 251, 240, 0.85);
            backdrop-filter: blur(15px);
            position: sticky;
            top: 0;
            z-index: 1000;
            border-bottom: 1px solid rgba(251, 192, 45, 0.15);
            transition: var(--tiemanh-transition);
        }
        .tiemanh-navbar.scrolled {
            padding: 12px 8%;
            box-shadow: var(--tiemanh-shadow-sm);
        }
        .tiemanh-logo {
            display: flex;
            align-items: center;
            gap: 12px;
            text-decoration: none;
            cursor: pointer;
        }
        .tiemanh-logo img, .tiemanh-logo-icon {
            width: 42px;
            height: 42px;
            filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
        }
        .tiemanh-logo-text {
            font-family: var(--tiemanh-serif);
            font-weight: 800;
            color: var(--tiemanh-dark);
            font-size: 22px;
            letter-spacing: -0.5px;
            display: flex;
            flex-direction: column;
            line-height: 1.1;
        }
        .tiemanh-logo-sub {
            font-family: var(--tiemanh-font);
            font-size: 11px;
            color: var(--tiemanh-primary-dark);
            letter-spacing: 2px;
            text-transform: uppercase;
            font-weight: 600;
        }
        .tiemanh-menu {
            display: flex;
            gap: 32px;
            list-style: none;
            margin: 0;
            padding: 0;
        }
        .tiemanh-menu-item a {
            text-decoration: none;
            color: var(--tiemanh-dark);
            font-weight: 600;
            font-size: 14.5px;
            letter-spacing: 0.5px;
            transition: var(--tiemanh-transition);
            position: relative;
            padding: 6px 0;
        }
        .tiemanh-menu-item a::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 3px;
            background-color: var(--tiemanh-primary);
            border-radius: 2px;
            transition: var(--tiemanh-transition);
        }
        .tiemanh-menu-item.active a, .tiemanh-menu-item a:hover {
            color: var(--tiemanh-primary-dark);
        }
        .tiemanh-menu-item.active a::after {
            width: 100%;
        }
        .tiemanh-btn-primary {
            background: linear-gradient(135deg, var(--tiemanh-primary), #ffb300);
            color: var(--tiemanh-dark) !important;
            border: none;
            border-radius: 30px;
            padding: 11px 24px;
            font-weight: 700;
            font-size: 14px;
            letter-spacing: 0.5px;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
            box-shadow: 0 6px 16px rgba(251, 192, 45, 0.25);
            transition: var(--tiemanh-transition);
            text-decoration: none;
        }
        .tiemanh-btn-primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(251, 192, 45, 0.4);
        }
        .tiemanh-btn-primary:active {
            transform: translateY(-1px);
        }

        /* 2. Hero Section */
        .tiemanh-hero {
            display: grid;
            grid-template-columns: 1.1fr 0.9fr;
            gap: 60px;
            align-items: center;
            padding: 80px 8% 100px 8%;
            background: radial-gradient(circle at 80% 20%, #fffde7 0%, var(--tiemanh-bg) 100%);
            position: relative;
        }
        .tiemanh-hero::after {
            content: '';
            position: absolute;
            width: 150px;
            height: 150px;
            background: radial-gradient(circle, rgba(255, 235, 59, 0.2) 0%, rgba(255, 255, 255, 0) 70%);
            top: 20%;
            left: 5%;
            pointer-events: none;
        }
        .tiemanh-hero-left {
            display: flex;
            flex-direction: column;
            gap: 24px;
        }
        .tiemanh-hero-subtitle {
            font-family: var(--tiemanh-cursive);
            font-style: italic;
            font-size: 34px;
            font-weight: 600;
            color: var(--tiemanh-primary-dark);
            margin: 0;
            line-height: 1;
        }
        .tiemanh-hero-title {
            font-family: var(--tiemanh-serif);
            font-size: 64px;
            font-weight: 900;
            line-height: 1.1;
            background: linear-gradient(135deg, #4a1525 0%, #c2185b 50%, #ffa000 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin: 0;
            letter-spacing: -2px;
            text-transform: uppercase;
        }
        .tiemanh-hero-desc {
            font-size: 16px;
            color: var(--tiemanh-text-light);
            margin: 0;
            max-width: 520px;
            line-height: 1.7;
        }
        .tiemanh-hero-btns {
            display: flex;
            gap: 16px;
            margin-top: 10px;
            flex-wrap: wrap;
        }
        .tiemanh-btn-secondary {
            background: var(--tiemanh-white);
            color: var(--tiemanh-dark);
            border: 2px solid rgba(0, 0, 0, 0.08);
            border-radius: 30px;
            padding: 11px 26px;
            font-weight: 700;
            font-size: 14px;
            cursor: pointer;
            transition: var(--tiemanh-transition);
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }
        .tiemanh-btn-secondary:hover {
            border-color: var(--tiemanh-dark);
            background: rgba(0,0,0,0.01);
            transform: translateY(-2px);
        }

        /* Polaroid stacked images */
        .tiemanh-hero-right {
            position: relative;
            height: 480px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .polaroid-stack {
            position: relative;
            width: 100%;
            height: 100%;
        }
        /* Vùng phát sáng vàng ấm áp phía sau các bức ảnh */
        .polaroid-stack::after {
            content: '';
            position: absolute;
            width: 350px;
            height: 350px;
            background: radial-gradient(circle, rgba(251, 192, 45, 0.15) 0%, rgba(251,192,45,0) 70%);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 0;
            pointer-events: none;
        }
        .polaroid-card {
            position: absolute;
            background: var(--tiemanh-white);
            padding: 14px 14px 28px 14px;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(74, 21, 37, 0.12), 0 5px 15px rgba(0, 0, 0, 0.05);
            width: 245px;
            transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
            border: 1px solid rgba(255, 255, 255, 0.9);
            cursor: pointer;
            z-index: 2;
        }
        
        /* Hiệu ứng băng keo giấy (Washi Tape) dán ảnh nghệ thuật */
        .polaroid-card::before {
            content: '';
            position: absolute;
            top: -12px;
            left: 50%;
            width: 80px;
            height: 26px;
            background-color: rgba(255, 255, 255, 0.38);
            backdrop-filter: blur(2px);
            border-left: 1px dashed rgba(0,0,0,0.06);
            border-right: 1px dashed rgba(0,0,0,0.06);
            box-shadow: 0 3px 8px rgba(0,0,0,0.02);
            z-index: 10;
        }
        
        .polaroid-card img {
            width: 100%;
            height: 245px;
            object-fit: cover;
            border-radius: 6px;
            border: 1px solid rgba(0, 0, 0, 0.05);
        }
        .polaroid-caption {
            font-family: var(--tiemanh-cursive);
            font-style: italic;
            font-size: 22px;
            text-align: center;
            margin-top: 15px;
            color: var(--tiemanh-dark);
        }
        
        /* Phân bổ các ảnh rải rác tự nhiên ra (Scatter) kèm hiệu ứng bay nhẹ */
        .polaroid-card.p1 {
            top: 5%;
            left: -5%;
            animation: floatCard1 5s infinite alternate ease-in-out;
        }
        .polaroid-card.p1::before {
            transform: translateX(-50%) rotate(-13deg);
        }
        
        .polaroid-card.p2 {
            top: 12%;
            left: 52%;
            animation: floatCard2 6s infinite alternate ease-in-out;
        }
        .polaroid-card.p2::before {
            transform: translateX(-50%) rotate(5deg);
        }
        
        .polaroid-card.p3 {
            top: 42%;
            left: 22%;
            animation: floatCard3 5.5s infinite alternate ease-in-out;
        }
        .polaroid-card.p3::before {
            transform: translateX(-50%) rotate(-2deg);
        }
        
        /* Tương tác khi Hover: Dừng bay, phóng to và nổi lên trên cùng */
        .polaroid-card:hover {
            animation: none !important;
            transform: scale(1.12) rotate(0deg) translateY(-20px) !important;
            z-index: 99 !important;
            box-shadow: 0 30px 60px rgba(251, 192, 45, 0.35), 0 10px 20px rgba(74, 21, 37, 0.1);
            border-color: rgba(251, 192, 45, 0.6);
        }

        /* Các chuyển động bay bổng tự do riêng biệt cho từng ảnh */
        @keyframes floatCard1 {
            0% { transform: rotate(-11deg) translateY(0px); }
            100% { transform: rotate(-8deg) translateY(-8px); }
        }
        @keyframes floatCard2 {
            0% { transform: rotate(5deg) translateY(0px); }
            100% { transform: rotate(8deg) translateY(-12px); }
        }
        @keyframes floatCard3 {
            0% { transform: rotate(1deg) translateY(0px); }
            100% { transform: rotate(-1deg) translateY(-10px); }
        }

        /* 3. Category Filter Bar */
        .tiemanh-section-container {
            padding: 60px 8%;
        }
        .tiemanh-filter-bar {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-bottom: 0px;
            flex-wrap: wrap;
        }
        .tiemanh-filter-group {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
        }
        .tiemanh-filter-label {
            font-size: 13px;
            font-weight: 700;
            color: var(--tiemanh-text);
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            opacity: 0.7;
        }
        .tiemanh-filter-pill {
            background: var(--tiemanh-white);
            color: var(--tiemanh-text);
            border: 1px solid rgba(0,0,0,0.05);
            border-radius: 30px;
            padding: 8px 22px;
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
            transition: var(--tiemanh-transition);
            box-shadow: var(--tiemanh-shadow-sm);
        }
        .tiemanh-filter-pill:hover {
            background: #fffde7;
            border-color: rgba(251, 192, 45, 0.5);
            transform: translateY(-2px);
        }
        .tiemanh-filter-pill.active {
            background: linear-gradient(135deg, var(--tiemanh-primary), #ffa000);
            color: var(--tiemanh-dark);
            border-color: transparent;
            font-weight: 700;
            box-shadow: 0 6px 15px rgba(251, 192, 45, 0.3);
        }

        /* 4. Concept Cards Grid */
        .tiemanh-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 28px;
        }
        .tiemanh-card {
            background: var(--tiemanh-white);
            border-radius: var(--tiemanh-border-radius);
            box-shadow: var(--tiemanh-shadow-sm);
            overflow: hidden;
            border: 1px solid rgba(251, 192, 45, 0.08);
            transition: var(--tiemanh-transition);
            display: flex;
            flex-direction: column;
            cursor: pointer;
            position: relative;
        }
        .tiemanh-card:hover {
            transform: translateY(-10px);
            box-shadow: var(--tiemanh-shadow-md);
            border-color: rgba(251, 192, 45, 0.3);
        }

        /* Collage inside card */
        .collage-wrapper {
            display: grid;
            grid-template-columns: 1.8fr 1fr;
            gap: 5px;
            height: 380px;
            padding: 6px;
            background: #fff6f8;
            overflow: hidden;
        }
        .collage-main-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 10px 0 0 10px;
            transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .collage-side {
            display: grid;
            grid-template-rows: 1fr 1fr;
            gap: 5px;
        }
        .collage-side-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .tiemanh-card:hover .collage-main-img {
            transform: scale(1.08);
        }
        .tiemanh-card:hover .collage-side-img {
            transform: scale(1.1);
        }
        .collage-side-img.top {
            border-radius: 0 10px 0 0;
        }
        .collage-side-img.bottom {
            border-radius: 0 0 10px 0;
        }
        .tiemanh-card:hover .collage-main-img, 
        .tiemanh-card:hover .collage-side-img {
            transform: scale(1.03);
        }

        /* Card Content footer */
        .tiemanh-card-footer {
            padding: 16px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-top: 1px solid rgba(0,0,0,0.02);
            background: var(--tiemanh-white);
            position: relative;
            z-index: 2;
        }
        .tiemanh-card-meta {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .tiemanh-card-icon-box {
            width: 38px;
            height: 38px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            transition: var(--tiemanh-transition);
        }
        .tiemanh-card-title-box {
            display: flex;
            flex-direction: column;
            line-height: 1.2;
        }
        .tiemanh-card-title {
            font-weight: 800;
            font-size: 14.5px;
            color: var(--tiemanh-dark);
            letter-spacing: 0.5px;
            margin: 0;
            text-transform: uppercase;
        }
        .tiemanh-card-count {
            font-size: 11.5px;
            color: var(--tiemanh-text-light);
            margin-top: 3px;
        }
        .tiemanh-card-arrow {
            color: var(--tiemanh-text-light);
            font-size: 18px;
            transition: var(--tiemanh-transition);
        }
        .tiemanh-card:hover .tiemanh-card-arrow {
            transform: translateX(5px);
            color: var(--tiemanh-primary-dark);
        }

        /* 5. CTA Section */
        .tiemanh-cta-panel {
            background: linear-gradient(135deg, #fff9e6 0%, #fff3cc 100%);
            border-radius: 24px;
            padding: 40px 60px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 50px 0;
            box-shadow: 0 10px 25px rgba(251, 192, 45, 0.08);
            border: 1px solid rgba(251, 192, 45, 0.15);
            position: relative;
            overflow: hidden;
        }
        .tiemanh-cta-left {
            display: flex;
            align-items: center;
            gap: 25px;
            position: relative;
            z-index: 2;
        }
        .tiemanh-cta-mascot {
            font-size: 64px;
            line-height: 1;
            filter: drop-shadow(0 6px 8px rgba(0,0,0,0.1));
            animation: bounce 3s ease-in-out infinite;
        }
        .tiemanh-cta-textbox {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }
        .tiemanh-cta-title {
            font-family: var(--tiemanh-serif);
            font-weight: 800;
            font-size: 24px;
            color: var(--tiemanh-dark);
            margin: 0;
        }
        .tiemanh-cta-desc {
            font-size: 15px;
            color: var(--tiemanh-text-light);
            margin: 0;
        }
        .tiemanh-cta-btn {
            position: relative;
            z-index: 2;
        }
        @keyframes bounce {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(5deg); }
        }

        /* 6. Footer */
        .tiemanh-footer {
            background: var(--tiemanh-dark);
            color: #d1d1d6;
            padding: 80px 8% 40px 8%;
            border-top: 5px solid var(--tiemanh-primary);
        }
        .tiemanh-footer-grid {
            display: grid;
            grid-template-columns: 1.2fr 0.8fr 0.8fr 1.2fr;
            gap: 50px;
            margin-bottom: 60px;
        }
        .tiemanh-footer-col {
            display: flex;
            flex-direction: column;
            gap: 22px;
        }
        .tiemanh-footer-logo .tiemanh-logo-text {
            color: var(--tiemanh-white);
        }
        .tiemanh-footer-desc {
            font-size: 13.5px;
            color: #8e8e93;
            line-height: 1.7;
            margin: 0;
        }
        .tiemanh-footer-title {
            font-size: 15px;
            font-weight: 700;
            color: var(--tiemanh-white);
            letter-spacing: 1px;
            text-transform: uppercase;
            position: relative;
            padding-bottom: 8px;
        }
        .tiemanh-footer-title::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 30px;
            height: 2px;
            background-color: var(--tiemanh-primary);
        }
        .tiemanh-footer-links {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .tiemanh-footer-links li a {
            color: #a2a2a9;
            text-decoration: none;
            font-size: 14px;
            transition: var(--tiemanh-transition);
        }
        .tiemanh-footer-links li a:hover {
            color: var(--tiemanh-primary);
            padding-left: 5px;
        }
        .tiemanh-footer-contacts {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            gap: 14px;
            font-size: 14px;
        }
        .tiemanh-footer-contacts li {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            color: #a2a2a9;
        }
        .tiemanh-footer-contacts li span.icon {
            color: var(--tiemanh-primary);
            font-size: 16px;
        }
        .tiemanh-footer-contacts li.address-line {
            display: flex;
            align-items: flex-start;
        }
        .tiemanh-footer-socials {
            display: flex;
            gap: 12px;
            margin-top: 15px;
        }
        .tiemanh-social-icon {
            width: 38px;
            height: 38px;
            background: rgba(255,255,255,0.05);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--tiemanh-white);
            text-decoration: none;
            font-size: 18px;
            transition: var(--tiemanh-transition);
        }
        .tiemanh-social-icon:hover {
            background: var(--tiemanh-primary);
            color: var(--tiemanh-dark);
            transform: translateY(-3px);
        }
        .tiemanh-footer-bottom {
            padding-top: 30px;
            border-top: 1px solid rgba(255,255,255,0.06);
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 13px;
            color: #636366;
        }

        /* 7. Premium Lightbox Modal */
        .tiemanh-lightbox-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(15, 15, 18, 0.96);
            z-index: 2000;
            display: none;
            opacity: 0;
            transition: opacity 0.3s ease;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
        }
        .tiemanh-lightbox-overlay.active {
            display: flex;
            opacity: 1;
        }
        .tiemanh-lightbox-container {
            width: 90%;
            max-width: 1200px;
            height: 85vh;
            display: grid;
            grid-template-columns: 1.4fr 0.6fr;
            background: var(--tiemanh-dark);
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 25px 60px rgba(0,0,0,0.5);
            border: 1px solid rgba(255,255,255,0.05);
            position: relative;
        }
        .tiemanh-lightbox-viewer {
            position: relative;
            background: #000;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            height: 100%;
        }
        .tiemanh-lightbox-img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            transition: transform 0.3s ease;
            cursor: zoom-in;
        }
        .tiemanh-lightbox-img.zoomed {
            transform: scale(1.6);
            cursor: zoom-out;
        }
        .tiemanh-lightbox-close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(0,0,0,0.5);
            color: var(--tiemanh-white);
            border: none;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            font-size: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 10;
            transition: var(--tiemanh-transition);
        }
        .tiemanh-lightbox-close:hover {
            background: var(--tiemanh-primary);
            color: var(--tiemanh-dark);
        }
        .tiemanh-lightbox-arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0,0,0,0.4);
            color: var(--tiemanh-white);
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            font-size: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 10;
            transition: var(--tiemanh-transition);
        }
        .tiemanh-lightbox-arrow:hover {
            background: var(--tiemanh-primary);
            color: var(--tiemanh-dark);
        }
        .tiemanh-lightbox-arrow.left { left: 20px; }
        .tiemanh-lightbox-arrow.right { right: 20px; }
        
        .tiemanh-lightbox-panel {
            padding: 40px;
            color: #d1d1d6;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            overflow-y: auto;
            border-left: 1px solid rgba(255,255,255,0.05);
        }
        .tiemanh-lightbox-cat {
            font-family: var(--tiemanh-cursive);
            font-style: italic;
            color: var(--tiemanh-primary);
            font-size: 28px;
            margin-bottom: 5px;
        }
        .tiemanh-lightbox-title {
            font-family: var(--tiemanh-serif);
            font-size: 32px;
            font-weight: 800;
            color: var(--tiemanh-white);
            margin: 0 0 20px 0;
            text-transform: uppercase;
        }
        .tiemanh-lightbox-desc {
            font-size: 14.5px;
            line-height: 1.7;
            color: #a2a2a9;
            margin-bottom: 30px;
        }
        .tiemanh-lightbox-thumb-container {
            display: flex;
            gap: 8px;
            margin-bottom: 20px;
            overflow-x: auto;
            padding-bottom: 6px;
            scrollbar-width: thin;
            scrollbar-color: var(--tiemanh-primary) rgba(255,255,255,0.05);
            scroll-snap-type: x mandatory;
            flex-shrink: 0;
        }
        .tiemanh-lightbox-thumb-container::-webkit-scrollbar {
            height: 4px;
        }
        .tiemanh-lightbox-thumb-container::-webkit-scrollbar-track {
            background: rgba(255,255,255,0.05);
            border-radius: 2px;
        }
        .tiemanh-lightbox-thumb-container::-webkit-scrollbar-thumb {
            background: var(--tiemanh-primary);
            border-radius: 2px;
        }
        .tiemanh-lightbox-thumb {
            width: 68px;
            height: 68px;
            border-radius: 8px;
            object-fit: cover;
            cursor: pointer;
            border: 2px solid transparent;
            transition: var(--tiemanh-transition);
            flex-shrink: 0;
            scroll-snap-align: start;
        }
        .tiemanh-lightbox-thumb.active, .tiemanh-lightbox-thumb:hover {
            border-color: var(--tiemanh-primary);
            transform: scale(1.08);
        }
        .tiemanh-lightbox-img-counter {
            font-size: 12px;
            color: rgba(255,255,255,0.4);
            margin-bottom: 12px;
            letter-spacing: 1px;
        }

        /* 8. Booking Form Modal */
        .tiemanh-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(15, 15, 18, 0.6);
            backdrop-filter: blur(8px);
            z-index: 3000;
            display: none;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .tiemanh-modal-overlay.active {
            display: flex;
            opacity: 1;
        }
        .tiemanh-modal-content {
            background: var(--tiemanh-white);
            border-radius: 20px;
            width: 90%;
            max-width: 500px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.15);
            overflow: hidden;
            border: 1px solid rgba(251, 192, 45, 0.15);
            position: relative;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        }
        .tiemanh-modal-overlay.active .tiemanh-modal-content {
            transform: scale(1);
        }
        .tiemanh-modal-header {
            background: linear-gradient(135deg, var(--tiemanh-primary), #ffb300);
            padding: 24px 30px;
            position: relative;
            color: var(--tiemanh-dark);
        }
        .tiemanh-modal-title {
            font-family: var(--tiemanh-serif);
            font-size: 22px;
            font-weight: 800;
            margin: 0;
            text-transform: uppercase;
        }
        .tiemanh-modal-subtitle {
            font-size: 12.5px;
            margin-top: 5px;
            opacity: 0.8;
            font-weight: 500;
        }
        .tiemanh-modal-close-btn {
            position: absolute;
            top: 24px;
            right: 25px;
            background: rgba(0,0,0,0.08);
            border: none;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: var(--tiemanh-transition);
        }
        .tiemanh-modal-close-btn:hover {
            background: var(--tiemanh-dark);
            color: var(--tiemanh-white);
        }
        .tiemanh-modal-body {
            padding: 30px;
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        .tiemanh-form-group {
            margin-bottom: 20px;
            display: flex;
            flex-direction: column;
            gap: 6px;
        }
        .tiemanh-form-group label {
            font-size: 13.5px;
            font-weight: 700;
            color: var(--tiemanh-dark);
        }
        .tiemanh-form-control {
            border: 1.5px solid rgba(0,0,0,0.08);
            border-radius: 10px;
            padding: 12px 16px;
            font-family: var(--tiemanh-font);
            font-size: 14.5px;
            transition: var(--tiemanh-transition);
        }
        .tiemanh-form-control:focus {
            outline: none;
            border-color: var(--tiemanh-primary-dark);
            box-shadow: 0 0 8px rgba(251, 192, 45, 0.2);
            background-color: #fffdf7;
        }
        .tiemanh-submit-btn {
            width: 100%;
            padding: 14px;
            border-radius: 12px;
            background: linear-gradient(135deg, var(--tiemanh-primary), #ffa000);
            color: var(--tiemanh-dark);
            border: none;
            font-weight: 700;
            font-size: 15px;
            cursor: pointer;
            box-shadow: 0 6px 15px rgba(251, 192, 45, 0.2);
            transition: var(--tiemanh-transition);
            margin-top: 10px;
        }
        .tiemanh-submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(251, 192, 45, 0.35);
        }

        /* Success screen inside Modal */
        .tiemanh-success-box {
            text-align: center;
            padding: 40px 20px;
            display: none;
            flex-direction: column;
            align-items: center;
            gap: 18px;
        }
        .tiemanh-success-icon {
            font-size: 64px;
            animation: pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .tiemanh-success-title {
            font-family: var(--tiemanh-serif);
            font-size: 24px;
            font-weight: 800;
            color: var(--tiemanh-dark);
            margin: 0;
        }
        .tiemanh-success-desc {
            font-size: 14.5px;
            color: var(--tiemanh-text-light);
            margin: 0;
        }
        @keyframes pop {
            0% { transform: scale(0); }
            100% { transform: scale(1); }
        }

        /* 4. Bảng giá Section */
        .tiemanh-banggia-sec {
            padding: 80px 8%;
            background-color: #fffbf0;
            text-align: center;
        }
        .tiemanh-sec-header {
            margin-bottom: 50px;
        }
        .tiemanh-sec-subtitle {
            font-family: var(--tiemanh-cursive);
            font-style: italic;
            font-size: 28px;
            color: var(--tiemanh-primary-dark);
            margin: 0;
        }
        .tiemanh-sec-title {
            font-family: var(--tiemanh-serif);
            font-size: 42px;
            font-weight: 800;
            margin: 10px 0 0 0;
            color: var(--tiemanh-dark);
            text-transform: uppercase;
            letter-spacing: -1px;
            position: relative;
            padding-bottom: 10px;
        }
        .tiemanh-sec-title::after {
            content: '';
            display: block;
            width: 50px;
            height: 3px;
            background: linear-gradient(90deg, var(--tiemanh-primary), #ffa000);
            margin: 12px auto 0 auto;
            border-radius: 2px;
        }
        .tiemanh-pricing-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-top: 40px;
        }
        .tiemanh-price-card {
            background-color: #fff2f5;
            border-radius: 25px;
            padding: 35px 25px;
            box-shadow: 0 10px 30px rgba(247, 196, 207, 0.35);
            transition: var(--tiemanh-transition);
            border: 2px solid #f8cbd4;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: stretch;
            text-align: left;
        }
        .tiemanh-price-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 35px rgba(247, 196, 207, 0.5);
            border-color: #f5a3b4;
        }
        .tiemanh-price-card.featured {
            border-color: var(--tiemanh-primary);
            background: linear-gradient(180deg, #ffffff 0%, #fffcf5 100%);
            box-shadow: 0 15px 35px rgba(251, 192, 45, 0.25);
        }
        .tiemanh-price-badge {
            position: absolute;
            top: 15px;
            right: -35px;
            background-color: var(--tiemanh-primary);
            color: var(--tiemanh-dark);
            font-size: 10px;
            font-weight: 700;
            padding: 5px 40px;
            transform: rotate(45deg);
            text-transform: uppercase;
        }
        .tiemanh-price-card h3 {
            font-family: var(--tiemanh-serif);
            font-size: 22px;
            font-weight: 800;
            margin: 0 0 15px 0;
            color: #5c1d30;
            text-align: center;
        }
        .tiemanh-price-tag {
            font-family: var(--tiemanh-serif);
            font-size: 32px;
            font-weight: 800;
            color: #5c1d30;
            margin-bottom: 25px;
            text-align: center;
        }
        .tiemanh-price-tag span {
            font-size: 16px;
            font-weight: 500;
            color: #7d4458;
        }
        .tiemanh-price-features {
            list-style: none;
            padding: 0 0 0 10px;
            margin: 0 0 20px 0;
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100%;
        }
        .tiemanh-price-features li {
            font-size: 14.5px;
            color: #4a2834;
            display: list-item;
            list-style-type: disc;
            margin-left: 15px;
            text-align: left;
        }
        .price-desc-highlight {
            font-size: 13.5px;
            color: #5c1d30;
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px dashed #f8cbd4;
            line-height: 1.5;
        }
        .price-desc-fit {
            font-size: 13px;
            color: #7d4458;
            margin-top: 8px;
            line-height: 1.4;
        }
        .price-best-seller {
            background: #ffeb3b;
            color: #5c1d30;
            font-weight: 800;
            font-size: 13px;
            padding: 5px 15px;
            border-radius: 20px;
            text-align: center;
            margin: 15px auto 0 auto;
            width: fit-content;
            box-shadow: 0 4px 10px rgba(255,235,59,0.3);
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        /* 5. Quy trình Section */
        .tiemanh-quytrinh-sec {
            padding: 80px 8%;
            background-color: #fffdf6;
            text-align: center;
        }
        .tiemanh-steps-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 30px;
            margin-top: 40px;
            position: relative;
        }
        .tiemanh-step-card {
            background-color: var(--tiemanh-white);
            border-radius: 16px;
            padding: 35px 25px;
            box-shadow: var(--tiemanh-shadow-sm);
            transition: var(--tiemanh-transition);
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
        }
        .tiemanh-step-card:hover {
            transform: translateY(-5px);
        }
        .tiemanh-step-number {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--tiemanh-primary);
            color: var(--tiemanh-dark);
            font-family: var(--tiemanh-serif);
            font-size: 20px;
            font-weight: 800;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            box-shadow: 0 4px 10px rgba(251, 192, 45, 0.3);
        }
        .tiemanh-step-card h4 {
            font-family: var(--tiemanh-serif);
            font-size: 18px;
            margin: 0 0 10px 0;
            color: var(--tiemanh-dark);
        }
        .tiemanh-step-card p {
            font-size: 13.5px;
            color: var(--tiemanh-text-light);
            margin: 0;
            line-height: 1.5;
        }

        /* 6. Feedback Section */
        .tiemanh-feedback-sec {
            padding: 80px 8%;
            background-color: #fffbf0;
            text-align: center;
        }
        .tiemanh-feedback-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-top: 40px;
        }
        .tiemanh-feedback-card {
            background-color: var(--tiemanh-white);
            border-radius: 16px;
            padding: 35px;
            box-shadow: var(--tiemanh-shadow-sm);
            text-align: left;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .tiemanh-feedback-quote {
            font-size: 15px;
            line-height: 1.6;
            color: var(--tiemanh-text);
            margin-bottom: 25px;
            font-style: italic;
        }
        .tiemanh-feedback-user {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        .tiemanh-feedback-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            object-fit: cover;
            background-color: #eee;
        }
        .tiemanh-feedback-info h5 {
            font-family: var(--tiemanh-serif);
            font-size: 15px;
            margin: 0;
            color: var(--tiemanh-dark);
        }
        .tiemanh-feedback-info span {
            font-size: 12px;
            color: var(--tiemanh-text-light);
        }
        
        /* 7. Chi nhánh Section */
        .tiemanh-chinhanh-sec {
            padding: 80px 8%;
            background-color: #fffdf6;
            text-align: center;
        }
        .tiemanh-branches-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 30px;
            margin-top: 40px;
        }
        .tiemanh-branch-card {
            background-color: var(--tiemanh-white);
            border-radius: 20px;
            padding: 40px 30px;
            box-shadow: var(--tiemanh-shadow-sm);
            transition: var(--tiemanh-transition);
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
        }
        .tiemanh-branch-card:hover {
            transform: translateY(-5px);
            box-shadow: var(--tiemanh-shadow-md);
        }
        .tiemanh-branch-icon {
            font-size: 36px;
            margin-bottom: 20px;
        }
        .tiemanh-branch-card h4 {
            font-family: var(--tiemanh-serif);
            font-size: 20px;
            margin: 0 0 15px 0;
            color: var(--tiemanh-dark);
        }
        .tiemanh-branch-card p {
            font-size: 14px;
            color: var(--tiemanh-text);
            margin: 0 0 10px 0;
            line-height: 1.5;
        }
        .tiemanh-branch-card .hotline {
            font-weight: 700;
            color: var(--tiemanh-primary-dark);
            font-size: 16px;
        }

        /* 9. Responsive layout adjust */
        @media (max-width: 1024px) {
            .tiemanh-navbar { padding: 18px 5%; }
            .tiemanh-hero { padding: 60px 5%; gap: 40px; }
            .tiemanh-hero-title { font-size: 46px; }
            .tiemanh-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
            .tiemanh-section-container { padding: 50px 5%; }
            .tiemanh-footer-grid { grid-template-columns: repeat(2, 1fr); }
            .tiemanh-lightbox-container { grid-template-columns: 1fr; height: 90vh; }
            .tiemanh-lightbox-panel { border-left: none; border-top: 1px solid rgba(255,255,255,0.05); padding: 25px; }
            .tiemanh-lightbox-thumb-container { margin-bottom: 20px; }
        }
        @media (max-width: 768px) {
            .tiemanh-pricing-grid, .tiemanh-steps-container, .tiemanh-feedback-grid, .tiemanh-branches-grid { grid-template-columns: 1fr; }
            .tiemanh-navbar { flex-direction: column; gap: 15px; padding: 15px; }
            .tiemanh-menu { gap: 15px; flex-wrap: wrap; justify-content: center; }
            .tiemanh-hero { grid-template-columns: 1fr; text-align: center; gap: 40px; padding: 40px 20px; }
            .tiemanh-hero-desc { margin: 0 auto; }
            .tiemanh-hero-btns { justify-content: center; }
            .tiemanh-hero-right { height: 350px; }
            .polaroid-card { width: 180px; padding: 10px 10px 20px 10px; }
            .polaroid-card img { height: 180px; }
            .polaroid-caption { font-size: 18px; margin-top: 10px; }
            .polaroid-card.p1 { left: 5%; }
            .polaroid-card.p2 { left: 50%; }
            .polaroid-card.p3 { left: 25%; top: 35%; }
            .tiemanh-grid { grid-template-columns: 1fr; }
            .tiemanh-cta-panel { flex-direction: column; text-align: center; gap: 30px; padding: 30px; }
            .tiemanh-cta-left { flex-direction: column; gap: 15px; }
            .tiemanh-footer-grid { grid-template-columns: 1fr; gap: 35px; }
            .tiemanh-footer-bottom { flex-direction: column; gap: 15px; text-align: center; }
        }
    `;

    // 2. Chèn Google Fonts và CSS vào trang
    const preconnect1 = document.createElement('link');
    preconnect1.rel = 'preconnect';
    preconnect1.href = 'https://fonts.googleapis.com';
    document.head.appendChild(preconnect1);

    const preconnect2 = document.createElement('link');
    preconnect2.rel = 'preconnect';
    preconnect2.href = 'https://fonts.gstatic.com';
    preconnect2.crossOrigin = 'anonymous';
    document.head.appendChild(preconnect2);

    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,800;1,600;1,800&display=swap';
    document.head.appendChild(fontLink);

    const styleTag = document.createElement("style");
    styleTag.innerHTML = STYLES;
    document.head.appendChild(styleTag);

    // 3. Cấu trúc giao diện HTML hoàn chỉnh
    const HTML_STRUCTURE = `
        <div id="tiemanh-root">
            <!-- Decorative animated mesh background blobs -->
            <div class="tiemanh-bg-blob pink"></div>
            <div class="tiemanh-bg-blob yellow"></div>
            <div class="tiemanh-bg-blob peach"></div>

            <!-- Header (Navbar) -->
            <header class="tiemanh-navbar" id="tiemanh-navbar">
                <a class="tiemanh-logo" id="logoLink">
                    <div class="tiemanh-logo-icon">🍍</div>
                    <div class="tiemanh-logo-text">
                        <span>Tiệm Ảnh</span>
                        <span class="tiemanh-logo-sub">Trái Thơm</span>
                    </div>
                </a>
                <ul class="tiemanh-menu">
                    <li class="tiemanh-menu-item active"><a href="#" id="menuTrangChu">Trang chủ</a></li>
                    <li class="tiemanh-menu-item"><a href="#" id="menuConcept">Concept</a></li>
                    <li class="tiemanh-menu-item"><a href="#" id="menuBangGia">Bảng giá</a></li>
                    <li class="tiemanh-menu-item"><a href="#" id="menuQuyTrinh">Quy trình</a></li>
                    <li class="tiemanh-menu-item"><a href="#" id="menuChiNhanh">Chi nhánh</a></li>
                    <li class="tiemanh-menu-item"><a href="#" id="menuLienHe">Liên hệ</a></li>
                </ul>
                <a href="#" class="tiemanh-btn-primary" id="btnDatLichHeader">📅 Đặt Lịch Ngay</a>
            </header>

            <!-- Hero Section -->
            <section class="tiemanh-hero">
                <div class="tiemanh-hero-left">
                    <h5 class="tiemanh-hero-subtitle">Bộ sưu tập</h5>
                    <h1 class="tiemanh-hero-title">Concept<br>Đa Dạng</h1>
                    <p class="tiemanh-hero-desc">
                        Hơn 100+ concept nghệ thuật được đầu tư trang phục, makeup và bối cảnh thiết kế bài bản, chỉn chu giúp bạn tự tin tỏa sáng theo phong cách rất riêng của chính mình.
                    </p>
                    <div class="tiemanh-hero-btns">
                        <button class="tiemanh-btn-primary" id="btnHeroTuVan">📅 Tư Vấn & Đặt Lịch</button>
                        <button class="tiemanh-btn-secondary" id="btnHeroBangGia">💎 Xem Bảng Giá</button>
                    </div>
                </div>
                <div class="tiemanh-hero-right">
                    <div class="polaroid-stack">
                        <div class="polaroid-card p1" data-concept-idx="0">
                            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80" alt="Nữ Tính">
                            <div class="polaroid-caption">Nữ Tính</div>
                        </div>
                        <div class="polaroid-card p2" data-concept-idx="2">
                            <img src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80" alt="Couple">
                            <div class="polaroid-caption">Couple</div>
                        </div>
                        <div class="polaroid-card p3" data-concept-idx="5">
                            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80" alt="Profile">
                            <div class="polaroid-caption">Profile</div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Main Filter & Grid Content -->
            <section class="tiemanh-section-container" id="filterBar">
                <!-- Filter bar -->
                <!-- Bộ lọc kép: Chi nhánh & Chủ đề -->
                <div class="tiemanh-filter-group" style="margin-bottom: 20px;">
                    <div class="tiemanh-filter-label">📍 Chọn Chi nhánh:</div>
                    <div class="tiemanh-filter-bar" id="branchFilterBar">
                        <button class="tiemanh-filter-pill active" data-branch="all">Tất cả</button>
                    </div>
                </div>

                <div class="tiemanh-filter-group" style="margin-bottom: 40px;">
                    <div class="tiemanh-filter-label">📸 Chọn Chủ đề:</div>
                    <div class="tiemanh-filter-bar" id="themeFilterBar">
                        <button class="tiemanh-filter-pill active" data-theme="all">Tất cả</button>
                    </div>
                </div>

                <!-- Concept cards grid -->
                <div class="tiemanh-grid" id="conceptGrid"></div>

            </section>

            <!-- [Đã xóa: Bảng giá, Quy trình, Chi nhánh — trang chỉ xem ảnh] -->
            <section class="tiemanh-banggia-sec" id="banggiaSection">
                <div class="tiemanh-sec-header">
                    <h5 class="tiemanh-sec-subtitle">Tiệm Ảnh Trái Thơm</h5>
                    <h2 class="tiemanh-sec-title">BẢNG GIÁ CHỤP ẢNH CÁ NHÂN</h2>
                    <p style="font-size: 15px; font-style: italic; color: #7d4458; margin-top: -10px; margin-bottom: 45px; text-align: center;">
                        Bảng giá dành cho 1 người, áp dụng duy nhất trong tháng này
                    </p>
                </div>
                <div class="tiemanh-pricing-grid">
                    <!-- Gói Thanh Xuân -->
                    <div class="tiemanh-price-card">
                        <h3>GÓI THANH XUÂN</h3>
                        <div class="tiemanh-price-tag">750.000 <span>đ</span></div>
                        <ul class="tiemanh-price-features">
                            <li>01 concept tự chọn</li>
                            <li>01 trang phục</li>
                            <li>05 ảnh chỉnh sửa</li>
                            <li>Thời gian chụp 30-45 phút</li>
                            <li>Nhận full ảnh gốc trong 24h</li>
                        </ul>
                        <div class="price-desc-highlight">⏰ Khách hàng <strong>chụp trải nghiệm nhanh</strong></div>
                        <div class="price-desc-fit">⭐ <strong>Phù hợp:</strong> Chụp kỷ niệm, sinh nhật.</div>
                        <button class="tiemanh-btn-primary btn-price-select" data-concept="Gói Thanh Xuân" style="margin-top: auto; width: 100%;">📅 ĐẶT LỊCH NGAY</button>
                    </div>

                    <!-- Gói Toả Sáng -->
                    <div class="tiemanh-price-card featured">
                        <div class="tiemanh-price-badge">Bán chạy</div>
                        <h3>🌸 GÓI TOẢ SÁNG</h3>
                        <div class="tiemanh-price-tag">1.250.000 <span>đ</span></div>
                        <ul class="tiemanh-price-features">
                            <li>02 concept tự chọn</li>
                            <li>02 trang phục</li>
                            <li>10 ảnh chỉnh sửa</li>
                            <li>Thời gian chụp 60 -90 phút</li>
                            <li>Nhận full ảnh gốc trong 24h</li>
                            <li>Tặng 01 ảnh in để bàn 13x18cm 🎁</li>
                        </ul>
                        <div class="price-desc-highlight">⚠️ <strong>Tiết kiệm</strong> hơn khi chụp nhiều concept</div>
                        <div class="price-desc-fit">⭐ <strong>Phù hợp:</strong> Chụp ảnh cá nhân, Beauty, Sinh nhật, Profile.</div>
                        <div class="price-best-seller">🔥 Best Seller 🔥</div>
                        <button class="tiemanh-btn-primary btn-price-select" data-concept="Gói Toả Sáng" style="margin-top: auto; width: 100%; box-shadow: 0 6px 20px rgba(251, 192, 45, 0.45);">📅 ĐẶT LỊCH NGAY</button>
                    </div>

                    <!-- Gói Hào Quang -->
                    <div class="tiemanh-price-card">
                        <h3>👑 GÓI HÀO QUANG</h3>
                        <div class="tiemanh-price-tag">2.490.000 <span>đ</span></div>
                        <ul class="tiemanh-price-features">
                            <li>03 concept tự chọn</li>
                            <li>03 trang phục</li>
                            <li>20 ảnh chỉnh sửa</li>
                            <li>Thời gian chụp 90-120 phút</li>
                            <li>Make up V.I.P ( Take care full set)</li>
                            <li>Nhận full ảnh gốc trong 24h</li>
                            <li>Quay video hậu trường 🎁</li>
                            <li>Tặng 01 ảnh lớn 20x30cm 🎁</li>
                            <li>Ưu tiên chọn lịch giờ vàng</li>
                        </ul>
                        <div class="price-desc-highlight">💎 Khách hàng thích trải nghiệm <strong>cao cấp</strong>, ekip sẽ <strong>chăm sóc kỹ từng chi tiết</strong></div>
                        <div class="price-desc-fit">⭐ <strong>Phù hợp:</strong> tất cả các concept chụp ảnh dịp quan trọng cần chỉn chu đầu tư.</div>
                        <button class="tiemanh-btn-primary btn-price-select" data-concept="Gói Hào Quang" style="margin-top: auto; width: 100%;">📅 ĐẶT LỊCH NGAY</button>
                    </div>
                </div>
            </section>

            <!-- Quy trình Section -->
            <section class="tiemanh-quytrinh-sec" id="quytrinhSection">
                <div class="tiemanh-sec-header">
                    <h5 class="tiemanh-sec-subtitle">Quy trình chuyên nghiệp</h5>
                    <h2 class="tiemanh-sec-title">Các Bước Thực Hiện</h2>
                </div>
                <div class="tiemanh-steps-container">
                    <div class="tiemanh-step-card">
                        <div class="tiemanh-step-number">1</div>
                        <h4>Tư vấn concept</h4>
                        <p>Lắng nghe mong muốn, gợi ý trang phục, địa điểm chụp phù hợp với tính cách.</p>
                    </div>
                    <div class="tiemanh-step-card">
                        <div class="tiemanh-step-number">2</div>
                        <h4>Đặt lịch & cọc</h4>
                        <p>Xác nhận ngày chụp, thời gian trang điểm và chuẩn bị trang phục chu đáo.</p>
                    </div>
                    <div class="tiemanh-step-card">
                        <div class="tiemanh-step-number">3</div>
                        <h4>Buổi chụp ảnh</h4>
                        <p>Nhiếp ảnh gia hướng dẫn tạo dáng tự nhiên, chụp trong không gian thoải mái.</p>
                    </div>
                    <div class="tiemanh-step-card">
                        <div class="tiemanh-step-number">4</div>
                        <h4>Chọn & Nhận ảnh</h4>
                        <p>Khách hàng tự chọn ảnh ưng ý để chỉnh sửa da, ánh sáng và nhận ảnh gốc.</p>
                    </div>
                </div>
            </section>

            <!-- Chi nhánh Section -->
            <section class="tiemanh-chinhanh-sec" id="chinhanhSection">
                <div class="tiemanh-sec-header">
                    <h5 class="tiemanh-sec-subtitle">Hệ thống phòng chụp</h5>
                    <h2 class="tiemanh-sec-title">Danh Sách Chi Nhánh</h2>
                </div>
                <div class="tiemanh-branches-grid">
                    <div class="tiemanh-branch-card">
                        <div class="tiemanh-branch-icon">📍</div>
                        <h4>Chi Nhánh Quận 1 – TP. HCM</h4>
                        <p>🏠 214/19/21 Nguyễn Văn Nguyễn, Phường Tân Định, Quận 1, TP. Hồ Chí Minh</p>
                        <p class="hotline">📞 0707 453 247 – 0866 723 499</p>
                    </div>
                    <div class="tiemanh-branch-card">
                        <div class="tiemanh-branch-icon">📍</div>
                        <h4>Chi Nhánh Thủ Đức</h4>
                        <p>🏠 81 Chương Dương, Phường Linh Chiểu, TP. Thủ Đức, TP. Hồ Chí Minh</p>
                        <p class="hotline">📞 Nhắn tin qua Facebook/Instagram chính thức</p>
                    </div>
                    <div class="tiemanh-branch-card">
                        <div class="tiemanh-branch-icon">📍</div>
                        <h4>Chi Nhánh Đà Nẵng</h4>
                        <p>🏠 62 Nại Nam, Phường Hòa Cường Bắc, Quận Hải Châu, Đà Nẵng</p>
                        <p class="hotline">📞 0337 733 455</p>
                    </div>
                    <div class="tiemanh-branch-card">
                        <div class="tiemanh-branch-icon">📍</div>
                        <h4>Chi Nhánh Biên Hòa – Đồng Nai</h4>
                        <p>🏠 Số 8, Đường N1 (song song đường Võ Thị Sáu), Phường Thống Nhất, Biên Hòa</p>
                        <p class="hotline">📞 0366 444 426</p>
                    </div>
                    <div class="tiemanh-branch-card">
                        <div class="tiemanh-branch-icon">📍</div>
                        <h4>Chi Nhánh Cần Thơ</h4>
                        <p>🏠 A12 Đường Số 1, Khu Dân Cư Nam Long, Cần Thơ</p>
                        <p class="hotline">📞 0949 533 251</p>
                    </div>
                    <div class="tiemanh-branch-card">
                        <div class="tiemanh-branch-icon">📍</div>
                        <h4>Chi Nhánh Bình Dương</h4>
                        <p>🏠 6 Đường Số 3, Phường Phú Hòa, TP. Thủ Dầu Một, Bình Dương</p>
                        <p class="hotline">📞 0367 416 058</p>
                    </div>
                </div>
            </section>

            <!-- Footer -->
            <footer class="tiemanh-footer">
                <div class="tiemanh-footer-grid">
                    <div class="tiemanh-footer-col">
                        <a class="tiemanh-logo tiemanh-footer-logo">
                            <div class="tiemanh-logo-icon">🍍</div>
                            <div class="tiemanh-logo-text">
                                <span>Tiệm Ảnh</span>
                                <span class="tiemanh-logo-sub" style="color: var(--tiemanh-primary);">Trái Thơm</span>
                            </div>
                        </a>
                        <p class="tiemanh-footer-desc">
                            Chụp lại ước mơ và lưu trữ từng khoảnh khắc thanh xuân rực rỡ trọn vẹn của bạn. Chúng tôi mang đến dịch vụ tận tâm và chuyên nghiệp hàng đầu.
                        </p>
                        <div class="tiemanh-footer-socials">
                            <a href="#" class="tiemanh-social-icon">f</a>
                            <a href="#" class="tiemanh-social-icon">📸</a>
                            <a href="#" class="tiemanh-social-icon">🎵</a>
                            <a href="#" class="tiemanh-social-icon">▶️</a>
                        </div>
                    </div>
                    <div class="tiemanh-footer-col">
                        <h4 class="tiemanh-footer-title">Dịch vụ</h4>
                        <ul class="tiemanh-footer-links">
                            <li><a href="#">Chụp chân dung</a></li>
                            <li><a href="#">Chụp couple lãng mạn</a></li>
                            <li><a href="#">Chụp kỷ yếu thanh xuân</a></li>
                            <li><a href="#">Chụp gia đình sum vầy</a></li>
                            <li><a href="#">Profile cá nhân chuyên nghiệp</a></li>
                        </ul>
                    </div>
                    <div class="tiemanh-footer-col">
                        <h4 class="tiemanh-footer-title">Hỗ trợ</h4>
                        <ul class="tiemanh-footer-links">
                            <li><a href="#">Bảng báo giá dịch vụ</a></li>
                            <li><a href="#">Quy trình chụp ảnh</a></li>
                            <li><a href="#">Các gói khuyến mãi</a></li>
                            <li><a href="#">Chính sách hủy đặt lịch</a></li>
                            <li><a href="#">Ý kiến phản hồi</a></li>
                        </ul>
                    </div>
                    <div class="tiemanh-footer-col">
                        <h4 class="tiemanh-footer-title">Liên hệ</h4>
                        <ul class="tiemanh-footer-contacts">
                            <li><span class="icon">📞</span> <span>Hotline: 0908 447 308</span></li>
                            <li><span class="icon">✉️</span> <span>Email: tiemanhtraithom@gmail.com</span></li>
                            <li class="address-line"><span class="icon">📍</span> <span>CS1: 214/19/21 Nguyễn Văn Nguyễn, Q.1, TP. Hồ Chí Minh</span></li>
                        </ul>
                    </div>
                </div>
                <div class="tiemanh-footer-bottom">
                    <span>© 2024 Tiệm Ảnh Trái Thơm. All rights reserved.</span>
                    <span>Thiết kế bởi Antigravity 💛</span>
                </div>
            </footer>

            <!-- Lightbox Modal -->
            <div class="tiemanh-lightbox-overlay" id="lightboxOverlay">
                <button class="tiemanh-lightbox-close" id="lightboxClose">&times;</button>
                <button class="tiemanh-lightbox-arrow left" id="lightboxPrev">&#10094;</button>
                <button class="tiemanh-lightbox-arrow right" id="lightboxNext">&#10095;</button>
                
                <div class="tiemanh-lightbox-container">
                    <div class="tiemanh-lightbox-viewer">
                        <img src="" alt="Full view" class="tiemanh-lightbox-img" id="lightboxImg">
                    </div>
                    <div class="tiemanh-lightbox-panel">
                        <div>
                            <div class="tiemanh-lightbox-cat" id="lightboxCat"></div>
                            <h2 class="tiemanh-lightbox-title" id="lightboxTitle"></h2>
                            <p class="tiemanh-lightbox-desc" id="lightboxDesc"></p>
                        </div>
                        <div>
                            <div style="font-weight: 700; margin-bottom: 12px; color: var(--tiemanh-white); font-size: 13.5px; text-transform: uppercase; letter-spacing: 0.5px;">BỘ SƯU TẬP ẢNH MẪU:</div>
                            <div class="tiemanh-lightbox-img-counter" id="lightboxImgCounter">1 / 10</div>
                            <div class="tiemanh-lightbox-thumb-container" id="lightboxThumbs"></div>
                            <button class="tiemanh-btn-primary" id="lightboxBookBtn" style="width: 100%; justify-content: center; padding: 14px;">
                                📅 ĐẶT LỊCH CONCEPT NÀY
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Booking Modal Form -->
            <div class="tiemanh-modal-overlay" id="bookingModal">
                <div class="tiemanh-modal-content">
                    <div class="tiemanh-modal-header">
                        <h3 class="tiemanh-modal-title" id="modalTitle">Đặt Lịch Hẹn</h3>
                        <p class="tiemanh-modal-subtitle">Hãy điền thông tin bên dưới, Trái Thơm sẽ liên hệ ngay lập tức!</p>
                        <button class="tiemanh-modal-close-btn" id="modalCloseBtn">&times;</button>
                    </div>
                    
                    <!-- Form đăng ký -->
                    <form class="tiemanh-modal-body" id="bookingForm">
                        <div class="tiemanh-form-group">
                            <label for="formName">Họ và tên của bạn *</label>
                            <input type="text" id="formName" class="tiemanh-form-control" placeholder="Ví dụ: Nguyễn Thùy Linh" required>
                        </div>
                        <div class="tiemanh-form-group">
                            <label for="formPhone">Số điện thoại liên hệ *</label>
                            <input type="tel" id="formPhone" class="tiemanh-form-control" placeholder="Ví dụ: 0908xxxxxx" required>
                        </div>
                        <div class="tiemanh-form-group">
                            <label for="formConcept">Lựa chọn Concept mẫu</label>
                            <select id="formConcept" class="tiemanh-form-control">
                                <option value="none">Tự chọn concept riêng / Chưa quyết định</option>
                                ${CONCEPTS.map(c => `<option value="${c.title}">${c.title}</option>`).join("")}
                            </select>
                        </div>
                        <div class="tiemanh-form-group">
                            <label for="formBranch">Chi nhánh mong muốn</label>
                            <select id="formBranch" class="tiemanh-form-control">
                                <option value="Q1">Chi nhánh Quận 1 – TP. HCM</option>
                                <option value="TD">Chi nhánh Thủ Đức – TP. HCM</option>
                                <option value="DN">Chi nhánh Đà Nẵng</option>
                                <option value="BH">Chi nhánh Biên Hòa – Đồng Nai</option>
                                <option value="CT">Chi nhánh Cần Thơ</option>
                                <option value="BD">Chi nhánh Bình Dương</option>
                            </select>
                        </div>
                        <button type="submit" class="tiemanh-submit-btn">GỬI YÊU CẦU ĐẶT LỊCH</button>
                    </form>

                    <!-- Success screen -->
                    <div class="tiemanh-success-box" id="successBox">
                        <div class="tiemanh-success-icon">🎉</div>
                        <h4 class="tiemanh-success-title">Gửi Đăng Ký Thành Công!</h4>
                        <p class="tiemanh-success-desc">
                            Cảm ơn bạn đã lựa chọn Tiệm Ảnh Trái Thơm. Ekip tư vấn viên của chúng tôi sẽ gọi điện hỗ trợ tư vấn chi tiết cho bạn trong vòng 15-30 phút tới nhé!
                        </p>
                        <button class="tiemanh-btn-primary" id="successCloseBtn" style="padding: 10px 30px;">Tuyệt Vời 💛</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // 4. Khởi tạo gắn giao diện lên trang
    function init() {
        // Tự động ghi đè chiều cao của khung Webcake để không bị giới hạn chiều cao ảnh
        if (CONFIG.targetId) {
            const targetEl = document.getElementById(CONFIG.targetId);
            if (targetEl) {
                targetEl.style.height = "auto";
                targetEl.style.minHeight = "auto";
                targetEl.style.padding = "0";
            }
            const overrideStyle = document.createElement("style");
            overrideStyle.innerHTML = `#${CONFIG.targetId} { height: auto !important; min-height: auto !important; padding: 0 !important; }`;
            document.head.appendChild(overrideStyle);
        }

        const rootContainer = document.getElementById("tiemanh-container") || document.getElementById(CONFIG.targetId);
        if (rootContainer) {
            // 🔥 Webcake Overlay Mode: Phủ toàn màn hình, che hết nội dung Webcake cũ
            const isInsideWebcake = document.body.children.length > 2; // Webcake đã có nhiều phần tử
            if (isInsideWebcake) {
                rootContainer.style.cssText = `
                    position: fixed !important;
                    top: 0 !important; left: 0 !important;
                    width: 100vw !important; height: 100vh !important;
                    z-index: 2147483647 !important;
                    overflow-y: auto !important;
                    overflow-x: hidden !important;
                    background: #0d0d0d;
                    -webkit-overflow-scrolling: touch;
                `;
                // Ngăn cuộn trang gốc Webcake
                document.body.style.overflow = "hidden";
            }
            rootContainer.innerHTML = HTML_STRUCTURE;
        } else {
            const body = document.body;
            if (body) {
                const isEmpty = body.innerText.trim().length <= 50; 
                if (isEmpty) {
                    body.innerHTML = HTML_STRUCTURE;
                } else {
                    const div = document.createElement("div");
                    div.id = "tiemanh-container";
                    div.style.cssText = `
                        position: fixed !important;
                        top: 0 !important; left: 0 !important;
                        width: 100vw !important; height: 100vh !important;
                        z-index: 2147483647 !important;
                        overflow-y: auto !important; overflow-x: hidden !important;
                        background: #0d0d0d;
                    `;
                    div.innerHTML = HTML_STRUCTURE;
                    body.style.overflow = "hidden";
                    body.appendChild(div);
                }
            }
        }


        window.addEventListener("scroll", function() {
            const navbar = document.getElementById("tiemanh-navbar");
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.classList.add("scrolled");
                } else {
                    navbar.classList.remove("scrolled");
                }
            }
        });

        setupGallery();
        randomizeHeroPolaroids();
        fetchConceptsFromSheets();
        setupInteractions();
    }

    // Hàm chuyển Google Drive share link → thumbnail URL ổn định (không bị chặn cross-origin)
    function driveToDirectUrl(url) {
        if (!url) return url;
        
        // Helper: trích xuất FILE_ID và trả về thumbnail URL
        function toThumbnail(fileId) {
            return `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`;
        }
        
        // Dạng: drive.google.com/file/d/FILE_ID
        const m1 = url.match(/drive\.google\.com\/file\/d\/([^/&#?]+)/);
        if (m1) return toThumbnail(m1[1]);
        
        // Dạng: drive.google.com/open?id=FILE_ID
        const m2 = url.match(/drive\.google\.com\/open\?id=([^&#?]+)/);
        if (m2) return toThumbnail(m2[1]);
        
        // Dạng: drive.google.com/uc?export=view&id=FILE_ID hoặc uc?id=FILE_ID
        const m3 = url.match(/id=([^&#?]+)/);
        if (m3 && url.includes("drive.google.com")) return toThumbnail(m3[1]);
        
        return url;
    }


    // Bộ sưu tập ảnh mẫu chất lượng cao để hiển thị nếu thư mục Drive của bạn đang trống
    const DEFAULT_PLACEHOLDERS = {
        "NANGTHO": [
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80",
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80"
        ],
        "COTRANG": [
            "https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&q=80",
            "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=400&q=80",
            "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&q=80"
        ],
        "BEAUTY": [
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80",
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80"
        ],
        "NGOAICANH": [
            "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80",
            "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=400&q=80",
            "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=80"
        ],
        "NOEL": [
            "https://images.unsplash.com/photo-1545048702-79362596cdc9?w=800&q=80",
            "https://images.unsplash.com/photo-1577043848358-4638accd988c?w=400&q=80",
            "https://images.unsplash.com/photo-1512474929763-f43c802e374c?w=400&q=80"
        ],
        "SEXY": [
            "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80",
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80",
            "https://images.unsplash.com/photo-1496449903678-c8dd7459a22b?w=400&q=80"
        ],
        "SINHNHAT": [
            "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&q=80",
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
            "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&q=80"
        ],
        "TET": [
            "https://images.unsplash.com/photo-1610471926615-d4e5fbf4ea6e?w=800&q=80",
            "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=80",
            "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&q=80"
        ],
        "GENERAL": [
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
            "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80"
        ]
    };

    // Hàm chuẩn hóa chữ để so khớp placeholder
    function cleanTextForMatching(text) {
        if (!text) return "";
        return String(text)
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/[^A-Z0-9]/gi, "")
            .toUpperCase();
    }

    // Hàm dọn dẹp các từ DONE, DONEE khỏi tên concept/chủ đề khi hiển thị trên web
    function cleanTitle(title) {
        if (!title) return "";
        return title
            .replace(/^(DONE+E*|DONEE*)\s*[-_]*\s*/gi, "") // Xóa DONE, DONEE ở đầu
            .replace(/\s*[-_]*\s*(DONE+E*|DONEE*)$/gi, "") // Xóa DONE, DONEE ở cuối
            .trim();
    }

    // Hàm chuẩn hóa và gộp nhóm các tên chủ đề trùng nhau hoặc viết sai chính tả
    function normalizeThemeName(theme) {
        if (!theme) return "";
        let clean = theme.trim()
            .replace(/^(CONCEPT|CONEPT)\s*[-_]*\s*/gi, "") // Xóa CONCEPT, CONEPT
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/Đ/g, "D")
            .replace(/đ/g, "d")
            .replace(/[^A-Z0-9]/gi, "")
            .toUpperCase();
            
        // Gộp nhóm về tên chuẩn viết hoa chữ cái đầu cho đồng bộ
        if (clean === "COTRANG") return "Cổ Trang";
        if (clean === "NGOAICANH") return "Ngoại Cảnh";
        if (clean === "SINHNHAT") return "Sinh Nhật";
        if (clean === "NANGTHO") return "Nàng Thơ";
        if (clean === "AODAI" || clean === "AODAIYEM" || clean === "AODAIVAYEM") return "Áo Dài";
        if (clean === "KYYEU") return "Kỷ Yếu";
        if (clean === "GIADINH") return "Gia Đình";
        if (clean === "BEAUTY") return "Beauty";
        if (clean === "NOEL" || clean === "NOELDO") return "Noel";
        if (clean === "SEXY") return "Sexy";
        if (clean === "TET") return "Tết";
        if (clean === "COUPLE") return "Couple";
        if (clean === "TRUNGTHU") return "Trung Thu";
        if (clean === "INDOOR") return "Indoor";
        if (clean === "THO") return "Thơ";
        if (clean === "NANGDONG") return "Năng Động";
        
        // Nếu tên khác lạ, tự động viết hoa chữ cái đầu các từ
        return theme.trim()
            .replace(/^(CONCEPT|CONEPT)\s*[-_]*\s*/gi, "")
            .split(' ')
            .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(' ');
    }

    // Xử lý dữ liệu nhận được từ Google Sheets JSONP
    function handleSheetsData(data) {
        try {
            const rows = data.table.rows;
            if (!rows || rows.length === 0) return;

            const cols = data.table.cols.map(c => (c.label || c.id || "").trim());
            const parsed = rows.map((row, rowIdx) => {
                const obj = {};
                row.c.forEach((cell, ci) => {
                    const colName = cols[ci] || "";
                    obj[colName] = cell ? String(cell.v ?? "").trim() : "";
                });

                // Tự động làm sạch tên concept và chuẩn hóa gộp nhóm chủ đề
                const cleanedTitle = cleanTitle(obj.title || "Concept");
                const cleanedTheme = normalizeThemeName(obj.theme || "");

                // Tập hợp các ảnh từ img1 -> img10
                let images = [];
                for (let n = 1; n <= 10; n++) {
                    const imgVal = driveToDirectUrl(obj[`img${n}`]);
                    if (imgVal) images.push(imgVal);
                }

                // NẾU THƯ MỤC TRÊN DRIVE ĐANG TRỐNG: Tự động gán ảnh mẫu để card không bị ẩn
                if (images.length < 3) {
                    const titleNorm = cleanTextForMatching(cleanedTitle);
                    let fallbackKey = "GENERAL";
                    for (const key in DEFAULT_PLACEHOLDERS) {
                        if (titleNorm.includes(key)) {
                            fallbackKey = key;
                            break;
                        }
                    }
                    images = DEFAULT_PLACEHOLDERS[fallbackKey];
                }

                const bgColor = (obj.bgColor || "rgba(251,192,45,0.1)").replace(/-/g, ",");

                return {
                    id: parseInt(obj.id || obj.concept_id) || rowIdx + 1,
                    branch: obj.branch || "",
                    theme: cleanedTheme,
                    title: cleanedTitle,
                    category: obj.category || "nutinh",
                    tag: obj.tag || obj.category || "Concept",
                    icon: obj.icon || "📸",
                    iconColor: obj.iconColor || "#fbc02d",
                    bgColor: bgColor,
                    description: obj.description || "",
                    images: images
                };
            }).filter(Boolean);

            if (parsed.length > 0) {
                CONCEPTS.length = 0;
                parsed.forEach(c => CONCEPTS.push(c));
                currentFiltered = [...CONCEPTS];
                setupGallery();
                randomizeHeroPolaroids(); // Cập nhật lại Polaroid stack ngẫu nhiên từ Sheets
                renderFilterBar();
                console.log(`[TiệmẢnh] ✅ Đã tải ${parsed.length} concept từ Google Sheets dạng JSONP (bypass CORS).`);
            }
        } catch (e) {
            console.warn("[TiệmẢnh] Lỗi xử lý dữ liệu từ Google Sheets:", e);
        }
    }

    // Hàm chọn 3 concept ngẫu nhiên từ bộ dữ liệu thật để đưa lên Hero banner
    function randomizeHeroPolaroids() {
        if (!CONCEPTS || CONCEPTS.length === 0) return;
        const polaroids = document.querySelectorAll(".polaroid-card");
        if (polaroids.length === 0) return;

        // Xáo trộn ngẫu nhiên danh sách concepts
        const shuffled = [...CONCEPTS].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, Math.min(3, shuffled.length));

        polaroids.forEach((card, i) => {
            if (i < selected.length) {
                const concept = selected[i];
                const imgEl = card.querySelector("img");
                const captionEl = card.querySelector(".polaroid-caption");
                
                if (imgEl && concept.images && concept.images.length > 0) {
                    imgEl.src = concept.images[0];
                    imgEl.alt = concept.title;
                }
                if (captionEl) {
                    captionEl.innerText = concept.title;
                }
                
                // Gán sự kiện click để mở trực tiếp Lightbox của concept tương ứng
                card.onclick = (e) => {
                    e.preventDefault();
                    openLightbox(concept);
                };
                
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    // 4b. Tải dữ liệu concept từ Google Sheets (CMS dạng bảng đơn - JSONP để bypass CORS)
    async function fetchConceptsFromSheets() {
        if (!CONFIG.sheetId) return;
        const apiUrl = `https://docs.google.com/spreadsheets/d/${CONFIG.sheetId}/gviz/tq?tqx=out:json`;

        // Định nghĩa callback toàn cục để Google Sheets gọi vào
        window.google = window.google || {};
        window.google.visualization = window.google.visualization || {};
        window.google.visualization.Query = window.google.visualization.Query || {};
        
        window.google.visualization.Query.setResponse = function(response) {
            handleSheetsData(response);
            const scriptTag = document.getElementById("tiemanh-sheets-jsonp");
            if (scriptTag) scriptTag.remove();
        };

        // Nhúng thẻ script để load dữ liệu (vượt qua hoàn toàn lỗi CORS của trình duyệt)
        const oldScript = document.getElementById("tiemanh-sheets-jsonp");
        if (oldScript) oldScript.remove();

        const script = document.createElement("script");
        script.id = "tiemanh-sheets-jsonp";
        script.src = apiUrl;
        document.head.appendChild(script);
    }

    // 5. Quản lý danh sách Concept và Bộ Lọc (Lọc kép)
    let currentFiltered = [...CONCEPTS];
    let selectedBranch = "all";
    let selectedTheme = "all";

    function setupGallery() {
        const grid = document.getElementById("conceptGrid");
        if (!grid) return;

        grid.innerHTML = "";

        // Intersection Observer để lazy load ảnh khi xuất hiện trong viewport
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute("data-src");
                    if (src) {
                        img.src = src;
                        img.removeAttribute("data-src");
                        img.style.background = "";
                    }
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: "200px 0px", threshold: 0.01 });

        currentFiltered.forEach((concept, index) => {
            const card = document.createElement("div");
            card.className = "tiemanh-card";
            card.setAttribute("data-id", concept.id);

            const img0 = concept.images[0] || "";
            const img1 = concept.images[1] || "";
            const img2 = concept.images[2] || "";
            const placeholderStyle = "background:linear-gradient(135deg,#f0f0f0,#e0e0e0);min-height:80px;";

            card.innerHTML = `
                <div class="collage-wrapper">
                    <img data-src="${img0}" class="collage-main-img" alt="${concept.title}" style="${img0 ? placeholderStyle : 'display:none'}">
                    <div class="collage-side">
                        <img data-src="${img1}" class="collage-side-img top" alt="${concept.title}" style="${img1 ? placeholderStyle : 'display:none'}">
                        <img data-src="${img2}" class="collage-side-img bottom" alt="${concept.title}" style="${img2 ? placeholderStyle : 'display:none'}">
                    </div>
                </div>
                <div class="tiemanh-card-footer">
                    <div class="tiemanh-card-meta">
                        <div class="tiemanh-card-icon-box" style="background: ${concept.bgColor}; color: ${concept.iconColor};">
                            ${concept.icon}
                        </div>
                        <div class="tiemanh-card-title-box">
                            <h4 class="tiemanh-card-title">${concept.title}</h4>
                            <span class="tiemanh-card-count">${concept.tag || concept.category}</span>
                        </div>
                    </div>
                    <div class="tiemanh-card-arrow">➔</div>
                </div>
            `;

            // Lazy load từng ảnh khi vào viewport
            card.querySelectorAll("img[data-src]").forEach(img => {
                if (img.getAttribute("data-src")) {
                    imgObserver.observe(img);
                }
            });

            // Click mở Lightbox
            card.addEventListener("click", () => {
                openLightbox(concept);
            });
            grid.appendChild(card);
        });
    }


    // 6. Trình xem ảnh Lightbox
    let activeConcept = null;
    let activeImgIdx = 0;
    let isZoomed = false;

    function openLightbox(concept) {
        activeConcept = concept;
        activeImgIdx = 0;
        isZoomed = false;

        const overlay = document.getElementById("lightboxOverlay");
        const lightboxImg = document.getElementById("lightboxImg");
        const lightboxCat = document.getElementById("lightboxCat");
        const lightboxTitle = document.getElementById("lightboxTitle");
        const lightboxDesc = document.getElementById("lightboxDesc");
        const thumbsContainer = document.getElementById("lightboxThumbs");

        if (!overlay || !lightboxImg) return;

        lightboxCat.textContent = `Concept ${concept.title}`;
        lightboxTitle.textContent = concept.title;
        lightboxDesc.textContent = concept.description;
        
        // Cập nhật zoom state về mặc định
        lightboxImg.className = "tiemanh-lightbox-img";

        // Tạo danh sách ảnh thu nhỏ (Thumbnails)
        thumbsContainer.innerHTML = "";
        const totalImages = concept.images.length;
        concept.images.forEach((imgUrl, idx) => {
            const thumb = document.createElement("img");
            thumb.src = imgUrl;
            thumb.alt = `${concept.title} - Ảnh ${idx + 1}`;
            thumb.className = `tiemanh-lightbox-thumb ${idx === 0 ? "active" : ""}`;
            thumb.title = `Ảnh ${idx + 1} / ${totalImages}`;
            thumb.addEventListener("click", () => {
                selectLightboxImage(idx);
            });
            thumbsContainer.appendChild(thumb);
        });

        // Cập nhật bộ đếm
        const counter = document.getElementById("lightboxImgCounter");
        if (counter) counter.textContent = `1 / ${totalImages}`;

        // Set ảnh chính ban đầu
        lightboxImg.src = concept.images[0];
        
        overlay.classList.add("active");
    }

    function selectLightboxImage(idx) {
        if (!activeConcept) return;
        activeImgIdx = idx;
        isZoomed = false;
        
        const lightboxImg = document.getElementById("lightboxImg");
        lightboxImg.src = activeConcept.images[idx];
        lightboxImg.className = "tiemanh-lightbox-img";

        // Cập nhật bộ đếm
        const counter = document.getElementById("lightboxImgCounter");
        if (counter) counter.textContent = `${idx + 1} / ${activeConcept.images.length}`;

        // Cuộn thumbnail đang active vào vùng nhìn thấy
        const thumbs = document.querySelectorAll(".tiemanh-lightbox-thumb");
        thumbs.forEach((t, i) => {
            if (i === idx) {
                t.classList.add("active");
                t.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
            } else {
                t.classList.remove("active");
            }
        });
    }

    function prevLightboxImage() {
        if (!activeConcept) return;
        let newIdx = activeImgIdx - 1;
        if (newIdx < 0) newIdx = activeConcept.images.length - 1;
        selectLightboxImage(newIdx);
    }

    // eslint-disable-next-line no-unused-vars
    function nextLightboxImage() {
        if (!activeConcept) return;
        let newIdx = (activeImgIdx + 1) % activeConcept.images.length;
        selectLightboxImage(newIdx);
    }

    // 7. Hộp thoại Đăng Ký Tư Vấn
    function openBookingModal(defaultConcept = "none") {
        const modal = document.getElementById("bookingModal");
        const conceptSelect = document.getElementById("formConcept");
        const form = document.getElementById("bookingForm");
        const success = document.getElementById("successBox");

        if (!modal) return;

        // Reset form
        if (form && success) {
            form.style.display = "flex";
            success.style.display = "none";
            form.reset();
        }

        if (conceptSelect && defaultConcept !== "none") {
            conceptSelect.value = defaultConcept;
        }

        modal.classList.add("active");
    }

    function closeBookingModal() {
        const modal = document.getElementById("bookingModal");
        if (modal) modal.classList.remove("active");
    }

    // Hiệu ứng pháo hoa giấy Confetti đơn giản khi gửi form thành công
    function triggerConfetti() {
        const duration = 2.5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 25, spread: 360, ticks: 50, zIndex: 9999 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 20 * (timeLeft / duration);
            
            // Tạo các mẩu confetti giả lập bằng DOM
            for (let i = 0; i < particleCount; i++) {
                const conf = document.createElement("div");
                conf.style.position = "fixed";
                conf.style.width = randomInRange(6, 12) + "px";
                conf.style.height = randomInRange(6, 12) + "px";
                conf.style.background = ["#fbc02d", "#ff758f", "#ff477e", "#2a9d8f", "#4361ee"][Math.floor(Math.random() * 5)];
                conf.style.borderRadius = "50%";
                conf.style.left = randomInRange(0, 100) + "vw";
                conf.style.top = "-10px";
                conf.style.zIndex = "9999";
                conf.style.opacity = "0.8";
                
                document.body.appendChild(conf);

                // Animate rơi xuống
                const anim = conf.animate([
                    { transform: "translateY(0) rotate(0deg)", opacity: 0.8 },
                    { transform: `translateY(110vh) translateX(${randomInRange(-150, 150)}px) rotate(${randomInRange(0, 720)}deg)`, opacity: 0 }
                ], {
                    duration: randomInRange(1500, 2500),
                    easing: "cubic-bezier(0.1, 0.8, 0.3, 1)"
                });

                anim.onfinish = () => conf.remove();
            }
        }, 150);
    }

    // 8. Đăng ký tương tác sự kiện
    function setupInteractions() {
        // Đăng ký sự kiện lọc danh mục
        setupFilterEvents();

        // Đóng mở Lightbox
        const lightboxOverlay = document.getElementById("lightboxOverlay");
        const lightboxClose = document.getElementById("lightboxClose");
        const lightboxPrev = document.getElementById("lightboxPrev");
        const lightboxNext = document.getElementById("lightboxNext");
        const lightboxImg = document.getElementById("lightboxImg");

        if (lightboxClose) {
            lightboxClose.addEventListener("click", () => {
                if (lightboxOverlay) lightboxOverlay.classList.remove("active");
            });
        }

        if (lightboxOverlay) {
            // Click ra ngoài đóng
            lightboxOverlay.addEventListener("click", (e) => {
                if (e.target === lightboxOverlay) {
                    lightboxOverlay.classList.remove("active");
                }
            });
        }

        // Prev / Next Lightbox
        if (lightboxPrev) lightboxPrev.addEventListener("click", prevLightboxImage);
        if (lightboxNext) lightboxNext.addEventListener("click", nextLightboxImage);

        // Zoom hình ảnh chính trong Lightbox
        if (lightboxImg) {
            lightboxImg.addEventListener("click", () => {
                isZoomed = !isZoomed;
                if (isZoomed) {
                    lightboxImg.classList.add("zoomed");
                } else {
                    lightboxImg.classList.remove("zoomed");
                }
            });
        }

        // Nhấp nút Đặt lịch trên Lightbox panel
        const lightboxBookBtn = document.getElementById("lightboxBookBtn");
        if (lightboxBookBtn) {
            lightboxBookBtn.addEventListener("click", () => {
                if (lightboxOverlay) lightboxOverlay.classList.remove("active");
                if (activeConcept) {
                    openBookingModal(activeConcept.title);
                } else {
                    openBookingModal();
                }
            });
        }



        // Bấm các nút mở booking modal
        const btnDatLichHeader = document.getElementById("btnDatLichHeader");
        const btnHeroTuVan = document.getElementById("btnHeroTuVan");
        const btnCtaTuVan = document.getElementById("btnCtaTuVan");

        if (btnDatLichHeader) btnDatLichHeader.addEventListener("click", () => openBookingModal());
        if (btnHeroTuVan) btnHeroTuVan.addEventListener("click", () => openBookingModal());
        if (btnCtaTuVan) btnCtaTuVan.addEventListener("click", () => openBookingModal());

        // Bấm nút đóng modal
        const modalCloseBtn = document.getElementById("modalCloseBtn");
        const successCloseBtn = document.getElementById("successCloseBtn");
        const bookingModal = document.getElementById("bookingModal");

        if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeBookingModal);
        if (successCloseBtn) successCloseBtn.addEventListener("click", closeBookingModal);
        if (bookingModal) {
            bookingModal.addEventListener("click", (e) => {
                if (e.target === bookingModal) closeBookingModal();
            });
        }

        // Nút xem bảng giá cuộn xuống phần Bảng Giá
        const btnHeroBangGia = document.getElementById("btnHeroBangGia");
        if (btnHeroBangGia) {
            btnHeroBangGia.addEventListener("click", () => {
                const sec = document.getElementById("banggiaSection");
                if (sec) sec.scrollIntoView({ behavior: "smooth", block: "start" });
            });
        }

        // Submit form đặt lịch
        const bookingForm = document.getElementById("bookingForm");
        const successBox = document.getElementById("successBox");
        if (bookingForm && successBox) {
            bookingForm.addEventListener("submit", async (e) => {
                e.preventDefault();
                
                // Thu thập thông tin khách hàng nhập
                const name = document.getElementById("formName")?.value || document.getElementById("bookingName")?.value || "";
                const phone = document.getElementById("formPhone")?.value || document.getElementById("bookingPhone")?.value || "";
                const concept = document.getElementById("formConcept")?.value || document.getElementById("bookingConcept")?.value || "";
                const branch = document.getElementById("formBranch")?.value || document.getElementById("bookingBranch")?.value || "";
                const note = document.getElementById("formNote")?.value || document.getElementById("bookingNote")?.value || "";
                
                const formData = {
                    name: name,
                    phone: phone,
                    concept: concept,
                    branch: branch,
                    note: note,
                    submittedAt: new Date().toLocaleString("vi-VN"),
                    sourceUrl: window.location.href,
                    userAgent: navigator.userAgent
                };

                // Phát Custom Event cho Webcake / Pancake tracking pixel (FB Pixel, GTM, Tiktok Pixel, v.v.)
                const trackingEvent = new CustomEvent("tiemanh-booking-success", { detail: formData });
                window.dispatchEvent(trackingEvent);

                // Gửi thông tin sang Webhook (nếu cấu hình webhookUrl)
                if (CONFIG && CONFIG.webhookUrl) {
                    try {
                        await fetch(CONFIG.webhookUrl, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(formData),
                            mode: "cors"
                        });
                    } catch (err) {
                        console.error("Gửi dữ liệu đặt lịch sang webhook thất bại:", err);
                    }
                }

                // Chuyển hướng sang trang Cảm ơn hoặc hiện Popup Confetti thành công
                if (CONFIG && CONFIG.redirectUrl) {
                    window.location.href = CONFIG.redirectUrl;
                } else {
                    // Ẩn form, hiện success screen
                    bookingForm.style.display = "none";
                    successBox.style.display = "flex";
                    // Nổ pháo hoa giấy chúc mừng
                    triggerConfetti();
                }
            });
        }

        // Một số nút menu phụ hoặc logo để cuộn lên trên cùng
        const logoLinks = document.querySelectorAll(".tiemanh-logo");
        logoLinks.forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
        });

        // Xử lý cuộn mượt cho toàn bộ Menu Header
        const menuScrollLinks = [
            { id: "menuTrangChu", targetId: null }, // null tức là cuộn lên top
            { id: "menuConcept", targetId: "filterBar" },
            { id: "menuBangGia", targetId: "banggiaSection" },
            { id: "menuQuyTrinh", targetId: "quytrinhSection" },
            { id: "menuChiNhanh", targetId: "chinhanhSection" },
            { id: "menuLienHe", targetId: "tiemanh-footer" }
        ];

        menuScrollLinks.forEach(link => {
            const el = document.getElementById(link.id);
            if (el) {
                el.addEventListener("click", (e) => {
                    e.preventDefault();
                    
                    // Loại bỏ class active ở tất cả menu items
                    document.querySelectorAll(".tiemanh-menu-item").forEach(item => {
                        item.classList.remove("active");
                    });
                    
                    // Thêm class active cho thẻ cha li
                    el.closest(".tiemanh-menu-item")?.classList.add("active");

                    if (link.targetId) {
                        const targetEl = document.getElementById(link.targetId);
                        if (targetEl) {
                            targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
                        }
                    } else {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                });
            }
        });

        // Bấm chọn từ bảng giá sẽ tự động mở modal và điền concept tương ứng
        const priceBtns = document.querySelectorAll(".btn-price-select");
        priceBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const conceptName = btn.getAttribute("data-concept") || "";
                openBookingModal(conceptName);
            });
        });
    }

    // 9. Hàm hỗ trợ vẽ lại Bộ lọc & Sự kiện động (Hỗ trợ bộ lọc kép thông minh)
    function renderFilterBar() {
        const branchBar = document.getElementById("branchFilterBar");
        if (!branchBar) return;

        // 1. Trích xuất các chi nhánh duy nhất (Cố định danh sách Chi nhánh)
        const branches = [{ slug: "all", name: "Tất cả" }];
        const seenBranches = new Set();
        CONCEPTS.forEach(c => {
            if (c.category && !seenBranches.has(c.category)) {
                seenBranches.add(c.category);
                branches.push({ slug: c.category, name: c.tag || c.category });
            }
        });

        // Vẽ danh sách chi nhánh
        if (branches.length > 1) {
            branchBar.innerHTML = branches.map(b => 
                `<button class="tiemanh-filter-pill ${b.slug === selectedBranch ? 'active' : ''}" data-branch="${b.slug}">${b.name}</button>`
            ).join("");
        }

        // 2. Vẽ lại thanh Chủ đề dựa theo chi nhánh đang chọn
        renderThemeFilterBar();
        
        setupFilterEvents();
    }

    // Hàm vẽ lại bộ lọc chủ đề dựa theo Chi nhánh được chọn để tránh bị trùng lặp hoặc trống kết quả
    function renderThemeFilterBar() {
        const themeBar = document.getElementById("themeFilterBar");
        if (!themeBar) return;

        // Lọc các concept của chi nhánh hiện tại để tìm các chủ đề tương ứng
        const availableConcepts = selectedBranch === "all" 
            ? CONCEPTS 
            : CONCEPTS.filter(c => c.category === selectedBranch);

        const themes = [{ slug: "all", name: "Tất cả" }];
        const seenThemes = new Set();
        availableConcepts.forEach(c => {
            if (c.theme) {
                const themeUpper = c.theme.trim().toUpperCase();
                if (!seenThemes.has(themeUpper)) {
                    seenThemes.add(themeUpper);
                    themes.push({ slug: themeUpper, name: c.theme.trim() });
                }
            }
        });

        // Vẽ danh sách chủ đề động
        themeBar.innerHTML = themes.map(t => 
            `<button class="tiemanh-filter-pill ${t.slug === selectedTheme ? 'active' : ''}" data-theme="${t.slug}">${t.name}</button>`
        ).join("");
    }

    function setupFilterEvents() {
        const branchPills = document.querySelectorAll("#branchFilterBar .tiemanh-filter-pill");
        const themePills = document.querySelectorAll("#themeFilterBar .tiemanh-filter-pill");

        // Sự kiện lọc Chi nhánh
        branchPills.forEach(pill => {
            pill.onclick = () => {
                branchPills.forEach(p => p.classList.remove("active"));
                pill.classList.add("active");
                selectedBranch = pill.getAttribute("data-branch");
                
                // Khi đổi Chi nhánh, reset Chủ đề về "Tất cả" và vẽ lại thanh chủ đề tương ứng của chi nhánh đó
                selectedTheme = "all";
                renderThemeFilterBar();
                setupFilterEvents(); // Đăng ký lại sự kiện click cho các nút chủ đề mới sinh ra
                applyDoubleFilter();
            };
        });

        // Sự kiện lọc Chủ đề
        themePills.forEach(pill => {
            pill.onclick = () => {
                themePills.forEach(p => p.classList.remove("active"));
                pill.classList.add("active");
                selectedTheme = pill.getAttribute("data-theme");
                applyDoubleFilter();
            };
        });
    }

    function applyDoubleFilter() {
        currentFiltered = CONCEPTS.filter(c => {
            const matchBranch = (selectedBranch === "all" || c.category === selectedBranch);
            const matchTheme = (selectedTheme === "all" || (c.theme && c.theme.toUpperCase() === selectedTheme));
            return matchBranch && matchTheme;
        });

        const grid = document.getElementById("conceptGrid");
        if (grid) {
            grid.style.opacity = "0";
            setTimeout(() => {
                setupGallery();
                grid.style.opacity = "1";
            }, 200);
        }
    }

    // 10. Khởi chạy hệ thống sau khi DOM load
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();