(() => {
  const STORAGE_KEY = "ratuOracleLanguage";
  const LANG_NAMES = {
    en: "English",
    id: "Bahasa Indonesia",
    zh: "中文",
    ru: "Русский"
  };
  const LANG_SHORT_NAMES = {
    en: "EN",
    id: "ID",
    zh: "中文",
    ru: "RU"
  };

  const basePhrases = {
    "Home": { id: "Beranda", zh: "首页", ru: "Главная" },
    "Language": { id: "Bahasa", zh: "语言", ru: "Язык" },
    "Marketplace": { id: "Pasar", zh: "市集", ru: "Маркетплейс" },
    "My Sphere": { id: "Sphere Saya", zh: "我的能量球", ru: "Моя сфера" },
    "Community": { id: "Komunitas", zh: "社区", ru: "Сообщество" },
    "Create Sphere": { id: "Buat Sphere", zh: "创建能量球", ru: "Создать сферу" },
    "Free Tarot": { id: "Tarot Gratis", zh: "免费塔罗", ru: "Бесплатное таро" },
    "Spirit Dolls": { id: "Boneka Roh", zh: "灵性娃娃", ru: "Духовные куклы" },
    "How it Works": { id: "Cara Kerja", zh: "如何运作", ru: "Как это работает" },
    "My Account": { id: "Akun Saya", zh: "我的账户", ru: "Мой аккаунт" },
    "Login / Signup": { id: "Masuk / Daftar", zh: "登录 / 注册", ru: "Войти / Регистрация" },
    "Every Chant Sphere carries a story.": { id: "Setiap Chant Sphere membawa sebuah kisah.", zh: "每一个 Chant Sphere 都承载一个故事。", ru: "Каждая Chant Sphere хранит историю." },
    "Use free Ratu Oracle guidance to discover which Chant Sphere fits the energy of the moment, then create, activate, share, buy, sell, or collect the Sphere with real owner experiences attached.": { id: "Gunakan panduan Ratu Oracle gratis untuk menemukan Chant Sphere yang sesuai dengan energi saat ini, lalu buat, aktifkan, bagikan, beli, jual, atau koleksi Sphere dengan pengalaman pemilik asli.", zh: "使用免费的 Ratu Oracle 指引，发现此刻最适合你的 Chant Sphere，然后创建、激活、分享、购买、出售或收藏带有真实主人经历的 Sphere。", ru: "Используйте бесплатное руководство Ratu Oracle, чтобы узнать, какая Chant Sphere подходит энергии момента, затем создавайте, активируйте, делитесь, покупайте, продавайте или собирайте сферы с реальными историями владельцев." },
    "Create My Sphere": { id: "Buat Sphere Saya", zh: "创建我的能量球", ru: "Создать мою сферу" },
    "Explore Marketplace": { id: "Jelajahi Pasar", zh: "探索市集", ru: "Открыть маркетплейс" },
    "people are sharing their energy and experiences": { id: "orang membagikan energi dan pengalaman mereka", zh: "人们正在分享能量与体验", ru: "люди делятся энергией и опытом" },
    "Get a Free Reading": { id: "Dapatkan Bacaan Gratis", zh: "获取免费解读", ru: "Получить бесплатное чтение" },
    "Receive guidance and draw your oracle cards.": { id: "Terima panduan dan tarik kartu oracle Anda.", zh: "获得指引并抽取你的神谕卡。", ru: "Получите подсказку и вытяните карты оракула." },
    "Create Your Sphere": { id: "Buat Sphere Anda", zh: "创建你的能量球", ru: "Создайте свою сферу" },
    "Add your intention and we create your personalized Sphere.": { id: "Tambahkan niat Anda dan kami membuat Sphere pribadi Anda.", zh: "加入你的意图，我们为你创建专属 Sphere。", ru: "Добавьте намерение, и мы создадим вашу персональную сферу." },
    "Activate and Share": { id: "Aktifkan dan Bagikan", zh: "激活并分享", ru: "Активировать и поделиться" },
    "Your Sphere gets a unique QR code and passport page.": { id: "Sphere Anda mendapat kode QR unik dan halaman paspor.", zh: "你的 Sphere 会获得唯一二维码和护照页面。", ru: "Ваша сфера получает уникальный QR-код и страницу паспорта." },
    "Share Experience": { id: "Bagikan Pengalaman", zh: "分享体验", ru: "Поделиться опытом" },
    "Write your experience, upload photos, and inspire the community.": { id: "Tulis pengalaman Anda, unggah foto, dan inspirasikan komunitas.", zh: "写下你的体验、上传照片，并启发社区。", ru: "Опишите опыт, загрузите фото и вдохновите сообщество." },
    "Buy, Sell, or Trade": { id: "Beli, Jual, atau Tukar", zh: "购买、出售或交换", ru: "Купить, продать или обменять" },
    "Your Sphere can be collected, sold, or traded with others.": { id: "Sphere Anda dapat dikoleksi, dijual, atau ditukar dengan orang lain.", zh: "你的 Sphere 可以被收藏、出售或与他人交换。", ru: "Вашу сферу можно коллекционировать, продавать или обменивать." },
    "Live Marketplace": { id: "Pasar Langsung", zh: "实时市集", ru: "Живой маркетплейс" },
    "All Spheres": { id: "Semua Sphere", zh: "所有能量球", ru: "Все сферы" },
    "Love": { id: "Cinta", zh: "爱", ru: "Любовь" },
    "Wealth": { id: "Kemakmuran", zh: "财富", ru: "Благополучие" },
    "Protection": { id: "Perlindungan", zh: "保护", ru: "Защита" },
    "Healing": { id: "Penyembuhan", zh: "疗愈", ru: "Исцеление" },
    "Clarity": { id: "Kejelasan", zh: "清晰", ru: "Ясность" },
    "Filters": { id: "Filter", zh: "筛选", ru: "Фильтры" },
    "View Sphere": { id: "Lihat Sphere", zh: "查看能量球", ru: "Смотреть сферу" },
    "View All Spheres": { id: "Lihat Semua Sphere", zh: "查看所有能量球", ru: "Смотреть все сферы" },
    "Sphere Passport": { id: "Paspor Sphere", zh: "能量球护照", ru: "Паспорт сферы" },
    "Latest Experiences": { id: "Pengalaman Terbaru", zh: "最新体验", ru: "Последние впечатления" },
    "Community Highlight": { id: "Sorotan Komunitas", zh: "社区亮点", ru: "Выбор сообщества" },
    "Share your journey. Inspire the world.": { id: "Bagikan perjalanan Anda. Inspirasikan dunia.", zh: "分享你的旅程。启发世界。", ru: "Поделитесь путем. Вдохновите мир." },
    "Write Your Experience": { id: "Tulis Pengalaman Anda", zh: "写下你的体验", ru: "Написать опыт" },
    "No experiences yet": { id: "Belum ada pengalaman", zh: "暂无体验", ru: "Пока нет впечатлений" },
    "Write the first real experience from the community.": { id: "Tulis pengalaman nyata pertama dari komunitas.", zh: "写下社区的第一条真实体验。", ru: "Напишите первый реальный опыт от сообщества." },
    "Safe and Trusted": { id: "Aman dan Tepercaya", zh: "安全可信", ru: "Безопасно и надежно" },
    "Every transaction is secured and protected.": { id: "Setiap transaksi aman dan terlindungi.", zh: "每笔交易都安全受保护。", ru: "Каждая сделка защищена." },
    "Real Stories": { id: "Kisah Nyata", zh: "真实故事", ru: "Реальные истории" },
    "Experiences from real people, real journeys.": { id: "Pengalaman dari orang nyata, perjalanan nyata.", zh: "来自真实人物和真实旅程的体验。", ru: "Опыт реальных людей и реальных путей." },
    "Energy Respect": { id: "Menghormati Energi", zh: "尊重能量", ru: "Уважение к энергии" },
    "We honor every intention and every story.": { id: "Kami menghormati setiap niat dan setiap kisah.", zh: "我们尊重每个意图与每个故事。", ru: "Мы уважаем каждое намерение и каждую историю." },
    "Community First": { id: "Komunitas Utama", zh: "社区优先", ru: "Сообщество прежде всего" },
    "We grow and learn together.": { id: "Kita tumbuh dan belajar bersama.", zh: "我们共同成长和学习。", ru: "Мы растем и учимся вместе." },
    "Quick Links": { id: "Tautan Cepat", zh: "快捷链接", ru: "Быстрые ссылки" },
    "Support": { id: "Dukungan", zh: "支持", ru: "Поддержка" },
    "Contact Us": { id: "Hubungi Kami", zh: "联系我们", ru: "Связаться с нами" },
    "Connect With Us": { id: "Terhubung Dengan Kami", zh: "联系我们", ru: "Связаться с нами" },
    "Join our newsletter": { id: "Bergabung dengan buletin kami", zh: "订阅我们的通讯", ru: "Подпишитесь на новости" },
    "Get updates, stories and special offers.": { id: "Dapatkan pembaruan, kisah, dan penawaran khusus.", zh: "获取更新、故事和特别优惠。", ru: "Получайте новости, истории и специальные предложения." },
    "Your email address": { id: "Alamat email Anda", zh: "你的邮箱地址", ru: "Ваш email" },
    "Buy / Trade": { id: "Beli / Tukar", zh: "购买 / 交换", ru: "Купить / Обменять" },
    "Experiences": { id: "Pengalaman", zh: "体验", ru: "Впечатления" },
    "Owners": { id: "Pemilik", zh: "主人", ru: "Владельцы" },
    "Members": { id: "Anggota", zh: "成员", ru: "Участники" },
    "Spheres Activated": { id: "Sphere Diaktifkan", zh: "已激活能量球", ru: "Активированные сферы" },
    "Days Active": { id: "Hari Aktif", zh: "活跃天数", ru: "Дней активно" },
    "Rating": { id: "Peringkat", zh: "评分", ru: "Рейтинг" },
    "Created on": { id: "Dibuat pada", zh: "创建于", ru: "Создано" },
    "Active": { id: "Aktif", zh: "已激活", ru: "Активно" },
    "View Passport": { id: "Lihat Paspor", zh: "查看护照", ru: "Смотреть паспорт" },
    "Buy This Sphere": { id: "Beli Sphere Ini", zh: "购买此能量球", ru: "Купить эту сферу" },
    "Loading latest experiences...": { id: "Memuat pengalaman terbaru...", zh: "正在加载最新体验...", ru: "Загрузка последних впечатлений..." },
    "Loading experiences...": { id: "Memuat pengalaman...", zh: "正在加载体验...", ru: "Загрузка впечатлений..." },
    "No Chant Spheres yet": { id: "Belum ada Chant Sphere", zh: "暂无 Chant Sphere", ru: "Пока нет Chant Sphere" },
    "Create the first Sphere and it will appear in the marketplace after Neon is connected.": { id: "Buat Sphere pertama dan itu akan muncul di pasar setelah Neon terhubung.", zh: "创建第一个 Sphere，Neon 连接后它会显示在市集中。", ru: "Создайте первую сферу, и она появится в маркетплейсе после подключения Neon." },
    "Create a sphere first": { id: "Buat Sphere dulu", zh: "先创建能量球", ru: "Сначала создайте сферу" },
    "Load marketplace spheres first": { id: "Muat Sphere pasar dulu", zh: "先加载市集能量球", ru: "Сначала загрузите сферы маркетплейса" },
    "Featured Chant Spheres are ready. Use the free reading to find which Sphere fits your energy now.": { id: "Chant Sphere pilihan sudah siap. Gunakan bacaan gratis untuk menemukan Sphere yang sesuai dengan energi Anda sekarang.", zh: "精选 Chant Sphere 已准备好。使用免费解读，找到此刻适合你能量的 Sphere。", ru: "Избранные Chant Sphere готовы. Используйте бесплатное чтение, чтобы найти сферу, подходящую вашей энергии сейчас." },
    "Buy Now": { id: "Beli Sekarang", zh: "立即购买", ru: "Купить сейчас" },
    "Make Offer": { id: "Buat Penawaran", zh: "出价", ru: "Сделать предложение" },
    "Trade My Sphere": { id: "Tukar Sphere Saya", zh: "交换我的能量球", ru: "Обменять мою сферу" },
    "Offer amount": { id: "Jumlah penawaran", zh: "出价金额", ru: "Сумма предложения" },
    "Your sphere to trade": { id: "Sphere Anda untuk ditukar", zh: "用于交换的能量球", ru: "Ваша сфера для обмена" },
    "Send Offer": { id: "Kirim Penawaran", zh: "发送出价", ru: "Отправить предложение" },
    "Status": { id: "Status", zh: "状态", ru: "Статус" },
    "Category": { id: "Kategori", zh: "类别", ru: "Категория" },
    "Intention": { id: "Niat", zh: "意图", ru: "Намерение" },
    "Activation spell": { id: "Kalimat aktivasi", zh: "激活咒语", ru: "Текст активации" },
    "QR URL": { id: "URL QR", zh: "二维码链接", ru: "QR-ссылка" },
    "Owner journey": { id: "Perjalanan pemilik", zh: "主人旅程", ru: "Путь владельца" },
    "Every sphere gets its own public QR story page.": { id: "Setiap sphere mendapat halaman cerita QR publik sendiri.", zh: "每个能量球都有自己的公开二维码故事页。", ru: "Каждая сфера получает свою публичную страницу истории QR." },
    "Scan Passport": { id: "Pindai Paspor", zh: "扫描护照", ru: "Сканировать паспорт" },
    "Admin Dashboard": { id: "Dasbor Admin", zh: "管理员面板", ru: "Панель администратора" },
    "Manage Chant Spheres, experiences, QR codes, and homepage settings.": { id: "Kelola Chant Sphere, pengalaman, kode QR, dan pengaturan beranda.", zh: "管理 Chant Sphere、体验、二维码和首页设置。", ru: "Управляйте Chant Sphere, опытом, QR-кодами и настройками главной страницы." },
    "Unlock Dashboard": { id: "Buka Dasbor", zh: "解锁面板", ru: "Открыть панель" },
    "Save Background": { id: "Simpan Latar", zh: "保存背景", ru: "Сохранить фон" },
    "Use Solomon Background": { id: "Gunakan Latar Solomon", zh: "使用 Solomon 背景", ru: "Использовать фон Соломона" },
    "Use Plain Gradient": { id: "Gunakan Gradien Polos", zh: "使用纯渐变", ru: "Использовать простой градиент" },
    "Publish Experience": { id: "Terbitkan Pengalaman", zh: "发布体验", ru: "Опубликовать опыт" },
    "Delete": { id: "Hapus", zh: "删除", ru: "Удалить" },
    "Refresh": { id: "Segarkan", zh: "刷新", ru: "Обновить" },
    "View Site": { id: "Lihat Situs", zh: "查看网站", ru: "Смотреть сайт" },
    "Free Online Tarot Reading": { id: "Bacaan Tarot Online Gratis", zh: "免费在线塔罗解读", ru: "Бесплатное онлайн таро" },
    "Spirit Dolls and Magickal Objects": { id: "Boneka Roh dan Benda Magickal", zh: "灵性娃娃与魔法物件", ru: "Духовные куклы и магические предметы" },
    "Solomon Love & Harmony Charm": { id: "Jimat Cinta & Harmoni Solomon", zh: "所罗门爱与和谐护符", ru: "Талисман любви и гармонии Соломона" },
    "Divine Light Chant Sphere": { id: "Cahaya Ilahi Chant Sphere", zh: "神圣之光 Chant Sphere", ru: "Божественный свет Chant Sphere" },
    "Unity Whole Chant Sphere": { id: "Kesatuan Utuh Chant Sphere", zh: "合一完整 Chant Sphere", ru: "Цельное единство Chant Sphere" },
    "Spirit Protection Chant Sphere": { id: "Perlindungan Roh Chant Sphere", zh: "灵性保护 Chant Sphere", ru: "Духовная защита Chant Sphere" },
    "Good Decree Chant Sphere": { id: "Keputusan Baik Chant Sphere", zh: "良善指令 Chant Sphere", ru: "Доброе решение Chant Sphere" },
    "Success Path Chant Sphere": { id: "Jalan Sukses Chant Sphere", zh: "成功之路 Chant Sphere", ru: "Путь успеха Chant Sphere" },
    "For attraction, devotion, reconciliation, mutual respect, and a steady bond between heart, word, and action.": { id: "Untuk daya tarik, pengabdian, rekonsiliasi, saling menghormati, dan ikatan stabil antara hati, kata, dan tindakan.", zh: "用于吸引、奉献、和解、互相尊重，并让心、言语与行动形成稳定联结。", ru: "Для притяжения, преданности, примирения, взаимного уважения и устойчивой связи между сердцем, словом и действием." },
    "For inner light, clean desire, blessing, clear decision, and the courage to lift a situation into its highest path.": { id: "Untuk cahaya batin, keinginan yang bersih, berkah, keputusan jelas, dan keberanian mengangkat keadaan ke jalan tertingginya.", zh: "用于内在光明、纯净愿望、祝福、清晰决定，以及把处境提升到最高道路的勇气。", ru: "Для внутреннего света, чистого желания, благословения, ясного решения и смелости поднять ситуацию на лучший путь." },
    "For integration, emotional repair, restored flow, and the return of scattered parts into one peaceful center.": { id: "Untuk integrasi, pemulihan emosi, aliran yang kembali, dan menyatukan bagian yang tercerai ke pusat damai.", zh: "用于整合、情感修复、恢复流动，并让分散的部分回到一个平静中心。", ru: "Для интеграции, эмоционального восстановления, возвращения потока и сбора рассеянных частей в спокойный центр." },
    "For strong boundaries, release from heavy influence, clean spiritual space, and the freedom to stand steady.": { id: "Untuk batas yang kuat, pelepasan dari pengaruh berat, ruang spiritual yang bersih, dan kebebasan untuk berdiri stabil.", zh: "用于强大边界、释放沉重影响、净化灵性空间，并稳稳站立。", ru: "Для крепких границ, освобождения от тяжелого влияния, чистого духовного пространства и устойчивости." },
    "For rightful support, firm command, protection of good work, and the strength to uphold a clean decision.": { id: "Untuk dukungan yang tepat, perintah tegas, perlindungan karya baik, dan kekuatan menjaga keputusan yang bersih.", zh: "用于正当支持、坚定指令、保护善行，以及维护清明决定的力量。", ru: "Для правильной поддержки, твердого распоряжения, защиты доброго дела и силы удержать чистое решение." },
    "For a new path of light, ease, prosperity, open doors, and steady movement toward the right opportunity.": { id: "Untuk jalan cahaya baru, kemudahan, kemakmuran, pintu terbuka, dan gerak stabil menuju peluang yang tepat.", zh: "用于新的光明道路、顺遂、繁荣、开启门户，并稳步走向正确机会。", ru: "Для нового светлого пути, легкости, процветания, открытых дверей и верного движения к нужной возможности." }
  };

  const translations = {
    en: {
      metaTitle: "Ratu Oracle - Chant Sphere Marketplace",
      metaDescription: "Free online tarot reading, Chant Spheres, spirit dolls, talismans, amulets, and owner stories for energy, protection, love, clarity, and healing.",
      phrases: {}
    },
    id: {
      metaTitle: "Ratu Oracle - Pasar Chant Sphere",
      metaDescription: "Bacaan tarot online gratis, Chant Sphere, boneka roh, talisman, amulet, dan kisah pemilik untuk energi, perlindungan, cinta, kejernihan, dan penyembuhan.",
      phrases: {}
    },
    zh: {
      metaTitle: "Ratu Oracle - Chant Sphere 市集",
      metaDescription: "免费在线塔罗解读、Chant Sphere、灵性娃娃、护符、符咒与主人故事，适合能量、保护、爱情、清晰与疗愈。",
      phrases: {}
    },
    ru: {
      metaTitle: "Ratu Oracle - маркетплейс Chant Sphere",
      metaDescription: "Бесплатное онлайн таро, Chant Sphere, духовные куклы, талисманы, амулеты и истории владельцев для энергии, защиты, любви, ясности и исцеления.",
      phrases: {}
    }
  };

  Object.entries(basePhrases).forEach(([english, values]) => {
    translations.en.phrases[english] = english;
    Object.keys(values).forEach(lang => {
      translations[lang].phrases[english] = values[lang];
    });
  });

  const normalizedPhraseIndex = {};
  function normalizePhrase(value) {
    return String(value || "")
      .replace(/[✦★*]+/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  }

  Object.keys(basePhrases).forEach(english => {
    normalizedPhraseIndex[normalizePhrase(english)] = english;
  });

  let activeLang = "en";
  let applying = false;

  function getByPath(path, lang = activeLang) {
    return path.split(".").reduce((value, key) => value && value[key], translations[lang]) || path;
  }

  function initialLanguage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && translations[stored]) return stored;
    const pathLang = location.pathname.split("/").filter(Boolean)[0];
    return translations[pathLang] ? pathLang : "en";
  }

  function injectStyles() {
    if (document.getElementById("ratu-i18n-style")) return;
    const style = document.createElement("style");
    style.id = "ratu-i18n-style";
    style.textContent = `
      .language-switcher{display:flex;align-items:center;gap:6px;max-width:100%;flex:0 0 auto}
      .language-switcher label{font-size:12px;font-weight:800;color:#3b254d;white-space:nowrap}
      .language-switcher select{min-height:36px;border:1px solid #dac8b9;border-radius:999px;background:#fffaf4;color:#2b173d;font-weight:800;padding:0 28px 0 10px;max-width:142px}
      html[lang="ru"] body,html[lang="zh"] body{overflow-wrap:anywhere}
      body{max-width:100%;overflow-x:hidden}
      @media (max-width:640px){
        nav,.nav-links,.nav-actions{max-width:100%}
        .language-switcher{width:auto;margin-top:0;gap:0}
        .language-switcher label{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
        .language-switcher select{width:auto;min-height:36px;max-width:82px;padding:0 20px 0 8px;font-size:12px}
      }
    `;
    document.head.appendChild(style);
  }

  function ensureMeta(name, content) {
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = name;
      document.head.appendChild(meta);
    }
    meta.content = content;
  }

  function translateExactText(text) {
    if (activeLang === "en") return text;
    const trimmed = text.trim();
    if (!trimmed) return text;
    const counted = translateCountedText(trimmed);
    if (counted) {
      const prefix = text.match(/^\s*/)?.[0] || "";
      const suffix = text.match(/\s*$/)?.[0] || "";
      return `${prefix}${counted}${suffix}`;
    }
    const canonical = normalizedPhraseIndex[normalizePhrase(trimmed)] || trimmed;
    const translated = translations[activeLang].phrases[canonical];
    if (!translated) return text;
    const prefix = text.match(/^\s*/)?.[0] || "";
    const suffix = text.match(/\s*$/)?.[0] || "";
    const decoration = /[✦★*]/.test(trimmed) ? " ✦" : "";
    return `${prefix}${translated}${decoration}${suffix}`;
  }

  function translateCountedText(trimmed) {
    const countLabel = trimmed.match(/^(\d[\d,]*)\+?\s+(Experiences|Owners|Members|Spheres Activated|Days Active)$/i);
    if (countLabel) {
      const plus = /\+/.test(trimmed) ? "+" : "";
      const label = normalizedPhraseIndex[normalizePhrase(countLabel[2])] || countLabel[2];
      const translated = translations[activeLang].phrases[label];
      return translated ? `${countLabel[1]}${plus} ${translated}` : "";
    }

    const loaded = trimmed.match(/^Loaded\s+(\d[\d,]*)\s+Chant\s+Spheres?\s+from\s+Neon\.$/i);
    if (loaded) {
      const forms = {
        id: `Memuat ${loaded[1]} Chant Sphere dari Neon.`,
        zh: `已从 Neon 加载 ${loaded[1]} 个 Chant Sphere。`,
        ru: `Загружено ${loaded[1]} Chant Sphere из Neon.`
      };
      return forms[activeLang] || "";
    }

    return "";
  }

  function translateTextNodes(root = document.body) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "SELECT", "OPTION"].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
        if (parent.closest(".notranslate,[data-no-translate]")) return NodeFilter.FILTER_REJECT;
        return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if (!node.__ratuOriginalText) node.__ratuOriginalText = node.nodeValue;
      node.nodeValue = activeLang === "en" ? node.__ratuOriginalText : translateExactText(node.__ratuOriginalText);
    });
  }

  function translateAttributes(root = document.body) {
    root.querySelectorAll("[placeholder],[title],[aria-label],[value]").forEach(el => {
      ["placeholder", "title", "aria-label"].forEach(attr => {
        const value = el.getAttribute(attr);
        if (!value) return;
        const key = `ratuOriginal${attr}`;
        if (!el.dataset[key]) el.dataset[key] = value;
        const original = el.dataset[key];
        el.setAttribute(attr, activeLang === "en" ? original : translateExactText(original));
      });
      if (el.tagName === "INPUT" && ["button", "submit", "reset"].includes(el.type)) {
        if (!el.dataset.ratuOriginalValue) el.dataset.ratuOriginalValue = el.value;
        el.value = activeLang === "en" ? el.dataset.ratuOriginalValue : translateExactText(el.dataset.ratuOriginalValue);
      }
    });
  }

  function injectSwitcher() {
    if (document.getElementById("languageSwitcher")) return;
    const wrap = document.createElement("div");
    wrap.className = "language-switcher";
    wrap.id = "languageSwitcher";
    wrap.innerHTML = `
      <label for="languageSelect">Language</label>
      <select id="languageSelect" aria-label="Language">
        ${Object.entries(LANG_NAMES).map(([code, name]) => `<option value="${code}" data-full="${name}" data-short="${LANG_SHORT_NAMES[code]}">${name}</option>`).join("")}
      </select>
    `;
    const target = document.querySelector(".nav-actions") || document.querySelector(".nav-links") || document.querySelector("nav") || document.body;
    target.appendChild(wrap);
    wrap.querySelector("select").addEventListener("change", event => setLanguage(event.target.value));
  }

  function updateSwitcher() {
    const select = document.getElementById("languageSelect");
    if (!select) return;
    Array.from(select.options).forEach(option => {
      option.textContent = window.matchMedia("(max-width: 640px)").matches ? option.dataset.short : option.dataset.full;
    });
    select.value = activeLang;
  }

  function updateSeo() {
    document.documentElement.lang = activeLang;
    document.title = translations[activeLang].metaTitle;
    ensureMeta("description", translations[activeLang].metaDescription);
    ensureMeta("og:title", translations[activeLang].metaTitle);
    ensureMeta("og:description", translations[activeLang].metaDescription);
  }

  function setLanguage(lang) {
    if (!translations[lang]) lang = "en";
    activeLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    applyTranslations();
  }

  function applyTranslations() {
    if (applying) return;
    applying = true;
    updateSeo();
    updateSwitcher();
    translateTextNodes();
    translateAttributes();
    applying = false;
  }

  function init() {
    injectStyles();
    injectSwitcher();
    activeLang = initialLanguage();
    applyTranslations();
    const observer = new MutationObserver(() => {
      if (!applying) window.requestAnimationFrame(applyTranslations);
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  window.RatuI18n = {
    t: getByPath,
    setLanguage,
    getLanguage: () => activeLang,
    translations
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
