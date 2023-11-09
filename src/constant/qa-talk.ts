export enum QATalkCategory {
  "ADVANTAGE" = "advantage",
  "SCHOOL" = "school",
  "CASE" = "case",
  "REPORT" = "report",
}

export const QA_TALK_CATEGORY_LABEL: Record<QATalkCategory, string> = {
  [QATalkCategory.ADVANTAGE]: "夯客優勢",
  [QATalkCategory.SCHOOL]: "問講學堂",
  [QATalkCategory.CASE]: "成功案例",
  [QATalkCategory.REPORT]: "媒體報導",
};

export type ArticleBody =
  // Tag
  | {
      type: "tag";
      content: QATalkCategory;
    }
  // H1, H2, H3
  | {
      type: "h1";
      content: Array<string>;
    }
  | {
      type: "h2";
      content: Array<string>;
    }
  | {
      type: "h3";
      content: Array<string>;
    }
  // Body
  | {
      type: "body";
      content: Array<string>;
      hypertext?: Array<{
        keyword: string;
        href: string;
      }>;
    }
  // Image
  | {
      type: "image";
      content: Array<{
        src: string;
        alt: string;
      }>;
    }
  // CALL OUT
  | {
      type: "callout";
      content: Array<string>;
      cta: {
        text: string;
        action: string;
      };
    }
  // Divider
  | {
      type: "divider";
    }
  // Hyperlink
  | {
      type: "hyperlink";
      content: Array<{
        title: string;
        href: string;
      }>;
    }
  // List
  | {
      type: "list-decimal";
      content: Array<string>;
    }
  | {
      type: "list-dot";
      content: Array<string>;
    };

// The utility type `GetArticleBodyByType` is used to get the type of `ArticleBody` by the value of `ArticleBody['type']`.
export type GetArticleBodyByType<Type = ArticleBody["type"]> =
  Type extends ArticleBody["type"]
    ? Omit<Extract<ArticleBody, { type: Type }>, "type">
    : never;

export type GetArticleBodyIncludeTypeByType<Type = ArticleBody["type"]> =
  Type extends ArticleBody["type"]
    ? Extract<ArticleBody, { type: Type }>
    : never;

export interface Article {
  id: string;
  title: string;
  category: QATalkCategory;
  meta: {
    description: string;
    coverImage: string;
  };
  foreignUrl?: string;
  body: Array<ArticleBody>;
}

export type ArticleWithSpecificBodyType<Type = ArticleBody["type"]> = Omit<
  Article,
  "body"
> & {
  body: Array<GetArticleBodyIncludeTypeByType<Type>>;
};

export const QA_TALK_ARTICLE: Array<Article> = [
  {
    id: "salonentrepreneurship",
    title: "2023美容創業指南》7大必知的開美容工作室成本",
    category: QATalkCategory.SCHOOL,
    meta: {
      description:
        "創業很難，真的很難！但你可以先看看這篇文章，少走一些冤枉路，讓你的創業經營更加安穩！",
      coverImage:
        "https://offcial-website-blog-assets.s3.ap-northeast-1.amazonaws.com/qatalk/salonentrepreneurship/01.png",
    },
    body: [
      {
        type: "tag",
        content: QATalkCategory.SCHOOL,
      },
      {
        type: "h1",
        content: ["2023美容創業指南》7大必知的開美容工作室成本"],
      },
      {
        type: "body",
        content: [
          "創業很難，真的很難！但你可以先看看這篇文章，少走一些冤枉路，讓你的創業經營更加安穩！",
        ],
      },
      {
        type: "image",
        content: [
          {
            src: "https://offcial-website-blog-assets.s3.ap-northeast-1.amazonaws.com/qatalk/salonentrepreneurship/02.png",
            alt: "美容工作室創業",
          },
        ],
      },
      {
        type: "body",
        content: [
          "不管是剪頭髮，還是近年來逐漸走紅的指甲美容、臉部美容等等，都是維持人們漂漂亮亮的重要產業，甚至可以說是許多人的生活必須。因此各式各樣的美業也成了人們生活中的剛性需求。你也有美容創業的理想嗎？本篇文章將介紹美容工作室創業不可不知的條件、需要考慮的成本，以及如何建立客源，提供最完整的美容創業指南。",
        ],
      },
      {
        type: "h2",
        content: ["小型美容創業趨勢正夯"],
      },
      {
        type: "body",
        content: [
          "美容美髮甚至是美甲美睫已經成了維持整潔、追求時尚、寵愛自己的必備行程，隨著消費需求的提升，也有許多美業工作室興起。這些工作室大多是有著專業的老師自己創業，憑著自身手藝建立知名度與自己的客群。",
        ],
      },
      {
        type: "h2",
        content: ["美容工作室創業要注意什麼？先認識7大開美容工作室成本"],
      },
      {
        type: "image",
        content: [
          {
            src: "https://offcial-website-blog-assets.s3.ap-northeast-1.amazonaws.com/qatalk/salonentrepreneurship/03.png",
            alt: "開美容工作室成本需考量裝潢",
          },
        ],
      },
      {
        type: "body",
        content: [
          "不論是什麼行業，只要創業，第一關一定要先有成本的觀念，美容工作室創業也是如此。以下將列舉開美容工作室必須要考量的7大成本，先估算好必須的成本之後，再開始美業創業計劃吧！",
        ],
      },
      {
        type: "h3",
        content: ["開美容工作室成本1》租金"],
      },
      {
        type: "body",
        content: [
          "開設美容工作室，首先會需要有可以接待客人的空間，而租賃這樣的空間勢必會有租金的產生，並且租金時常是每個月支出的主要佔比。想要節省工作室租金的方式不少，可以選擇租用較小的空間、選擇蛋白區的地段，或是選擇與其他行業合租一個空間。唯獨不論租金怎麼省，都務必要提供客人一個安心又能放鬆的環境，才能提供最佳的服務體驗，讓客人源源不絕。若能開立在一個受信任的地段，如交通便利（捷運站旁），知名景點旁，而不是暗巷或者大樓社區，也能提升客人來店意願與信任度。",
        ],
      },
      {
        type: "h3",
        content: ["開美容工作室成本2》裝潢"],
      },
      {
        type: "body",
        content: [
          "選定了工作室的位置以及空間後，接下來就是要進行裝潢了。不論是牆壁的材質、櫃檯、室內照明、氣氛燈，都是裝潢的一部分。裝潢費用在工作室剛落成時、或是時間一久，要改頭換面時都要加以考慮。",
        ],
      },
      {
        type: "body",
        content: [
          "在經營時，也需要做好財務管理，提撥一定比例的保養、修繕和未來定期的裝潢費用，做好良好的預算規劃，也能有助於你的經營管理，不會捉襟見肘。。",
        ],
      },
      {
        type: "h3",
        content: ["開美容工作室成本3》設備"],
      },
      {
        type: "body",
        content: [
          "美容設備是不同與於美甲材料、美睫材料、洗髮精護髮品等等消耗品的長期設備，例如美甲工作室，勢必會有光療機、銼刀等設備；如果是美髮工作室，則會有洗頭區、燙髮機等設備需要添購。",
        ],
      },
      {
        type: "body",
        content: [
          "此類型設備費用較高，相對淘汰更新的速度較慢，該選擇何種適合自己工作室的設備、又不會造成太大負擔，是美容創業前必須要仔細考量的要素。在美容設備上，若要挑選二手設備，也需要考量到衛生、安全性與耐用年限，若是貪小便宜而購買到不好的器材，相對是得不償失。",
        ],
      },
      {
        type: "body",
        content: [
          "透過直接跟經銷商、原廠購買也能獲得較穩定的品質，或者自身在美容社團、協會中發起團購，也有助於降低購買的單價，節省成本。",
        ],
      },
      {
        type: "h3",
        content: ["開美容工作室成本4》美甲 / 美睫 / 消耗品材料費"],
      },
      {
        type: "body",
        content: [
          "相對於剛剛提到的設備，不同類型的美業會有不同類型的材料或是消耗品。與設備不同的是，材料的費用會隨著來客數的增加而成正比。因此在美容創業必須要將材料費仔細算進成本中。",
        ],
      },
      {
        type: "body",
        content: [
          "也因為有耗材的使用，所以做好庫存管理也是很重要的。採取「先進先出」、「每日盤點」和「安全庫存」的控管，都能讓你精準掌握成本。",
        ],
      },
      {
        type: "body",
        content: [
          "耗材跟添購設備相同，透過直接跟經銷商、原廠購買可以獲得一定的品質保障。找到穩定的供應來源，利用團購優勢壓低單價，也都是降低成本的方法。",
        ],
      },
      {
        type: "h3",
        content: ["開美容工作室成本5》經常性營業費用"],
      },
      {
        type: "body",
        content: [
          "經常性營業費用指的是工作室或店面的水費、電費、或是大樓管理費等等。此類型的費用是只要工作時還開著，每個月就必定會產生的支出。預先估計每個月的經常性費用，可以幫助估算美容創業每個月所需的固定支出。",
        ],
      },
      {
        type: "h3",
        content: ["開美容工作室成本6》證照資格進修費用"],
      },
      {
        type: "body",
        content: [
          "美容產業是跟隨流行的產業，因此美容從業者也必須時時增進技術或掌握流行趨勢，以提供最新的美容項目。這些練習或是考取證照甚至是上課進修等等的費用，也必須要算在開店的成本當中。如果有編列年度預算的習慣，建議也要編列在內。",
        ],
      },
      {
        type: "h3",
        content: ["開美容工作室成本7》員工薪資與培訓費用"],
      },
      {
        type: "body",
        content: [
          "如果美容工作室生意好，需要招募助理甚至是櫃檯接待，就會增加人力費用；而提供良好的人資培訓與留才策略對於經營將大有助益。例如：明確的薪資與分紅方式、有紀律的工作守則、有效率的指揮鏈等等，都能減少員工與你之間的糾紛，也讓經營變得有原則；接著適度的授權，也能讓員工夥伴對自身工作產生認同，在員工忠誠度與留任率上也會有所幫助。",
        ],
      },
      {
        type: "callout",
        content: [
          "上千個品牌都已經使用夯客，數位轉型正夯，你還在猶豫什麼？快來試試吧！",
        ],
        cta: {
          text: "立即註冊",
          action: "https://hot.cak.ee/joinus",
        },
      },
      {
        type: "divider",
      },
      {
        type: "h2",
        content: ["開美容工作室條件有哪些？4大條件不可不知"],
      },
      {
        type: "image",
        content: [
          {
            src: "https://offcial-website-blog-assets.s3.ap-northeast-1.amazonaws.com/qatalk/salonentrepreneurship/04.png",
            alt: "開美容工作室成本的消耗性材料",
          },
        ],
      },
      {
        type: "h3",
        content: ["開美容工作室條件1》確立市場定位"],
      },
      {
        type: "body",
        content: [
          "會員系統能夠幫助您深入瞭解會員群體。通過收集和分析會員數據，您可以瞭解會員的年齡、性別、地理位置、消費累積等資訊，幫助商家夥伴更好了解會員結構與組成，並依據會員類型和需求提供客製的產品或服務。",
        ],
      },
      {
        type: "body",
        content: [
          "成功的夥伴除了技術力之外，在品牌LOGＯ、開店地點和網路行銷上，都有契合自己本身的定位，且達到一定的水準。透過細節的累積，才能建立起與其他競爭者的差異。",
        ],
      },
      {
        type: "h3",
        content: ["開美容工作室條件2》制定經營策略"],
      },
      {
        type: "body",
        content: [
          "確立美容工作室的市場定位後，接著要來規劃經營策略。許多人會覺得開美容工作室不就是開張就好了嗎？其實不然，經營策略包含了如何吸引客群？如何推出具有競爭力的服務項目？設備材料要跟哪些供應商購買才最穩定且划算？如何與顧客建立關係？用什麼方式觸及新客人？這些都是經營策略的一環。",
        ],
      },
      {
        type: "body",
        content: [
          "透過會員系統的再行銷功能，如票券、紅利點數和儲值金，打造出品牌專屬的「會員忠誠計畫」，讓客人不會感受到壓迫感，而是專屬的優惠權利，是很重要的尺度拿捏。過多的行銷活動是許多商家夥伴們常犯的錯誤，儲值又打折再加上週年慶活動，這樣的活動除了讓計算營收變得複雜之外，也會衍生客人對於行銷活動的認知落差，進而產生消費糾紛。",
        ],
      },
      {
        type: "body",
        content: [
          "在經營管理上，適量的促銷是對經營有幫助的，但過多則不一定有效。",
        ],
      },
      {
        type: "h3",
        content: ["開美容工作室條件3》規劃成本預算"],
      },
      {
        type: "body",
        content: [
          "開美容工作室前，需要先釐清需要多少資金以及有哪些必須成本，如果沒有成本規劃的概念，那非常有可能算不清楚自己究竟是賺或是賠。將上段提到的7大美業成本要素仔細盤算，規劃好能兼顧成本與品質的計劃，並確保手邊有足夠營業3個月成本開銷的現金，會是較理想的選擇。",
        ],
      },
      {
        type: "h3",
        content: ["開美容工作室條件4》完成營業登記與商業登記"],
      },
      {
        type: "body",
        content: [
          "完成了市場定位、經營策略以及成本規劃後，開美容工作室的最後一個條件就是進行營業登記與商業登記。在台灣以營利為目的的開業，除非是攤販、家庭農、林、漁、牧業者、家庭手工業者、民宿經營者或是每月未達4萬元，其餘一率需要進行營業登記以及商業登記。以免被查驗或是遭檢舉違規營業，反而要付上罰鍰，得不償失，甚至危害商譽。",
        ],
      },
      {
        type: "body",
        content: [
          "完成營業登記和商業登記後，也不用擔心同業檢舉和消費糾紛產生時的劣勢立場，也能申請政府相關補助計畫與補貼，效益多多。",
        ],
      },
      {
        type: "callout",
        content: [
          "上千個品牌都已經使用夯客，數位轉型正夯，你還在猶豫什麼？快來試試吧！",
        ],
        cta: {
          text: "立即註冊",
          action: "https://hot.cak.ee/joinus",
        },
      },
      {
        type: "divider",
      },
      {
        type: "h2",
        content: ["6招建立美容工作室客源"],
      },
      {
        type: "image",
        content: [
          {
            src: "https://offcial-website-blog-assets.s3.ap-northeast-1.amazonaws.com/qatalk/salonentrepreneurship/05.png",
            alt: "建立美容工作室客源",
          },
        ],
      },
      {
        type: "body",
        content: [
          "完成了營業登記後，終於準備要開張了！接著就是要來進行客人服務，大展身手的時刻。要如何建立美容工作室客源呢？以下將介紹6個建立美容工作室客源的方法，讓客人看到你的好，源源不絕地預約！",
        ],
      },
      {
        type: "h3",
        content: ["美容工作室客源建立1》建立作品集"],
      },
      {
        type: "body",
        content: [
          "美容工作室最重要的就是作品集。客人會依照作品集來判斷設計師或美容老師的風格是否符合自己的喜好。因此建立客源的首要方式就是建立作品集。社群媒體、部落格或是官方網站，都是展示作品集的好地方。",
        ],
      },
      {
        type: "body",
        content: [
          "建議建立Instagram當作自己的作品集，可以設定商業品牌帳號並設定公開，固定上傳作品與工作室活動來豐富版面，對於陌生客開發或者之後投放廣告，也能導流到Instagram中，再連動LINE官方帳號，這樣的流程就有引導性，招募新客也會變得簡單，對日後Call客來店也有幫助。",
        ],
      },
      {
        type: "h3",
        content: ["美容工作室客源建立2》社群建立品牌形象"],
      },
      {
        type: "body",
        content: [
          "有了作品集之後，接下來便需要著手建立品牌形象。如果是1人工作室，則可以將自己打造成一個品牌來經營，重點是傳達一致的風格以及設計手法，建立鮮明的印象。例如強調專門進行韓式精準剪裁，便可以張貼該風格為主的作品照片。",
        ],
      },
      {
        type: "body",
        content: [
          "如果預算足夠，建議可以找尋合適的平面設計師，打造專屬的LOGO，有利於消費者辨識之外也能提供品牌的專業度。而除此之外，隨時充實自己的行銷知識，多參加夯客舉辦的講座，也能提升經營思維，減少一些試錯成本，少走冤枉路。",
        ],
      },
      {
        type: "h3",
        content: ["美容工作室客源建立3》口碑行銷"],
      },
      {
        type: "body",
        content: [
          "建立起品牌形象之後，下一步可以透過現有的會員來進行口碑行銷。口碑行銷包含的層面很廣，從客人的口耳相傳，到Google地圖上的評論，甚至是客人在論壇或社群媒體的發文打卡，都是口碑行銷的一環。口碑行銷基於真實體驗的心得，可以帶來更強的信任度。因此下次有客人完成課程後，不妨請客人留下好評或是介紹給有需要的朋友吧！",
        ],
      },
      {
        type: "body",
        content: [
          "從現在開始，你就應該累積Google地圖上的評論，透過回饋累積五星好評。如果還沒有建立Google店家，請立即去做！GoogleMap是導流與自來客最有價值的平台，非常推薦經營。",
        ],
      },
      {
        type: "h3",
        content: ["美容工作室客源建立4》關鍵字行銷廣告"],
      },
      {
        type: "body",
        content: [
          "在美容工作室擁有一定規模之後，可以加碼數位行銷預算獲取更多的新客。關鍵字廣告可以精準曝光在主動搜尋此關鍵字的使用者眼前；而廣告投放則可以鎖定特定的客群，例如25到35歲的中山區女性。這些都是獲取新客源的好方法。",
        ],
      },
      {
        type: "h3",
        content: ["美容工作室客源建立5》KOL / KOC網紅加強推廣"],
      },
      {
        type: "body",
        content: [
          "如果覺得關鍵字或是廣告投放難以量化曝光成效，那麼也可以使用KOL或KOC的網紅行銷加強推廣。網紅行銷的好處在於網紅的受眾輪廓十分鮮明，可以精準對同一群目標客人曝光，甚至是透過網紅推薦碼提供折扣優惠，吸引新客。",
        ],
      },
      {
        type: "h3",
        content: ["美容工作室客源建立6》建置預約系統優化客人體驗"],
      },
      {
        type: "body",
        content: [
          "透過以上方式建立了一定的客源量之後，如何提供好的預約體驗是客人留存的關鍵。許多美業工作室還停留在手動回覆通訊軟體，不但需要放下手邊的工作回覆客人訊息，當預約一多時，也難以安排預約的時間。因此選用良好的預約系統是美業工作室必要的投資。好的預約系統不但可以解放你的雙手，有些帶有智慧AI排程的系統，還可以優先幫等級較高的熟客安排較好的時段，讓你輕鬆進行會員經營！",
        ],
      },
      {
        type: "body",
        content: [
          "透過導入預約系統，提升效率之外，好的預約系統也能幫你帶來新客，透過優質的預約體驗，讓新客對你不再陌生，也不用因為要人工交談而怯步，提升成交率；而透過預約系統附帶的會員機制，也能打造會員行銷，增加你的營收與來客率。",
        ],
      },
      {
        type: "callout",
        content: [
          "上千個品牌都已經使用夯客，數位轉型正夯，你還在猶豫什麼？快來試試吧！",
        ],
        cta: {
          text: "立即註冊",
          action: "https://hot.cak.ee/joinus",
        },
      },
      {
        type: "divider",
      },
      {
        type: "h2",
        content: ["會員系統推薦 HOTCAKE夯客，打造更完整會員管理"],
      },
      {
        type: "body",
        content: [
          "在數位化時代，會員系統已經成為經營成功的不可或缺的工具。會員系統不僅可以提高會員忠誠度，還可以提供寶貴的數據和洞察，幫助商家做出更明智的行銷和業務決策。美容工作室剛開業，還在苦惱要用使用哪種會員系統嗎？推薦你HOTCAKE夯客會員系統。夯客提供各種功能，包括會員標籤、黑名單/觀察名單、儲值金/紅利點數、定期報告、自動化通知等，幫助工作繁忙的你有效管理會員與預約，提升服務品質，讓顧客滿意成為你的忠實會員！",
        ],
      },
      {
        type: "h3",
        content: ["延伸閱讀："],
      },
      {
        type: "body",
        content: [
          "屬於美業最重要的功能莫過於直接提供會員直接在線上預約的功能。好的會員系統可以連結會員資訊，或是串接通訊或社群軟體（例如LINE官方帳號），透過通訊或社群軟體提供預約服務，不但方便會員在手機上輕鬆進行預約，系統自動顯示可預約時間並進行安排，方便商家進行預約管理，告別手忙腳亂！",
        ],
      },
      {
        type: "hyperlink",
        content: [
          {
            title: "奧客 Get Out! 夯客幫你找到好客人",
            href: "https://post.cak.ee/2022001",
          },
        ],
      },
      {
        type: "hyperlink",
        content: [
          {
            title: "預約好頭痛？你不能不知的夯客四大優勢",
            href: "https://post.cak.ee/2022002",
          },
        ],
      },
      {
        type: "hyperlink",
        content: [
          {
            title: "建立會員資料庫，了解你的客人",
            href: "https://post.cak.ee/2022003",
          },
        ],
      },
    ],
  },
  {
    id: "whatiscrm",
    title: "會員系統是什麼？瞭解會員管理系統功能，加值商家競爭力",
    category: QATalkCategory.SCHOOL,
    meta: {
      description:
        "提升美業競爭力，從掌握會員資料開始，有會員才有資料，有資料才有管理，有管理才有商機。",
      coverImage:
        "https://offcial-website-blog-assets.s3.ap-northeast-1.amazonaws.com/qatalk/whatiscrm/02.png",
    },
    body: [
      {
        type: "tag",
        content: QATalkCategory.SCHOOL,
      },
      {
        type: "h1",
        content: ["會員系統是什麼？瞭解會員管理系統功能，加值商家競爭力"],
      },
      {
        type: "body",
        content: [
          "提升美業競爭力，從掌握會員資料開始，有會員才有資料，有資料才有管理，有管理才有商機。",
        ],
      },
      {
        type: "image",
        content: [
          {
            src: "https://offcial-website-blog-assets.s3.ap-northeast-1.amazonaws.com/qatalk/whatiscrm/01.png",
            alt: "會員系統費用怎麼算",
          },
        ],
      },
      {
        type: "body",
        content: [
          "在現代數位化的商業環境中，會員系統已經成為商家管理會員、管理預約課程和提升營收的重要工具。會員管理系統可以幫助商家夥伴更好地了解顧客並與其互動，管理預約服務，並有效地掌握會員資源。本文將深入探討會員系統的不同類型、使用優勢、功能，以及費用相關資訊，幫助您了解如何善用會員系統來推動美業業務。",
        ],
      },
      {
        type: "h2",
        content: ["會員系統是什麼？認識2大類型的會員系統"],
      },
      {
        type: "body",
        content: [
          "會員系統是一種用於管理會員或用戶資訊的軟體工具，旨在幫助商家夥伴更好地理解並與會員互動，以提供更個性化的服務並且增加會員忠誠度。現在，讓我們來看看三種最常見的會員系統：",
        ],
      },
      {
        type: "h3",
        content: ["會員管理系統類型1》自架會員系統"],
      },
      {
        type: "image",
        content: [
          {
            src: "https://offcial-website-blog-assets.s3.ap-northeast-1.amazonaws.com/qatalk/whatiscrm/02.png",
            alt: "會員系統費用怎麼算",
          },
        ],
      },
      {
        type: "body",
        content: [
          "自己架設會員系統是指商家夥伴自行設計、開發和管理的會員管理系統。這種系統通常基於商家夥伴的具體需求，可以高度客製化，以滿足不同商業模式的要求。自架系統的優勢在於完全擁有數據控制權，但也需要相對較高的技術和資源。並且需要相關技術人員的投入以及維運，自行負擔經營系統的人事成本與開發費用，是用於集團經營或者已具備一定規模之商家夥伴。",
        ],
      },
      {
        type: "h3",
        content: ["會員管理系統類型2》雲端SaaS會員系統"],
      },
      {
        type: "body",
        content: [
          "相較於自架會員系統，雲端SaaS（軟體即服務）會員系統是一種基於雲端技術的服務，通常以訂閱制形式提供系統服務。這類型的會員管理系統不需要商家夥伴進行大規模的軟體開發，只需通過註冊取得帳號後即可直接使用，也具備相對的彈性設定，讓商家夥伴能自行打造適合自己的會員系統模組。這種系統通常具有簡單易用的界面，並提供即時更新和會員支援，降低了管理和維護成本。",
        ],
      },
      {
        type: "callout",
        content: [
          "上千個品牌都已經使用夯客，數位轉型正夯，你還在猶豫什麼？快來試試吧！",
        ],
        cta: {
          text: "立即註冊",
          action: "https://hot.cak.ee/joinus",
        },
      },
      {
        type: "divider",
      },
      {
        type: "h2",
        content: ["使用會員管理系統的4大優勢，加速美業提升會員忠誠度"],
      },
      {
        type: "image",
        content: [
          {
            src: "https://offcial-website-blog-assets.s3.ap-northeast-1.amazonaws.com/qatalk/whatiscrm/03.png",
            alt: "會員預約系統推薦夯客",
          },
        ],
      },
      {
        type: "body",
        content: ["現在，讓我們深入瞭解使用會員管理系統的優勢："],
      },
      {
        type: "h3",
        content: ["會員系統優勢1》 分析現有客群"],
      },
      {
        type: "body",
        content: [
          "會員系統能夠幫助您深入瞭解會員群體。通過收集和分析會員數據，您可以瞭解會員的年齡、性別、地理位置、消費累積等資訊，幫助商家夥伴更好了解會員結構與組成，並依據會員類型和需求提供客製的產品或服務。",
        ],
      },
      {
        type: "h3",
        content: ["會員系統優勢2》管理經營會員"],
      },
      {
        type: "body",
        content: [
          "會員系統讓商家夥伴能更加便利管理及追蹤會員的狀況。透過會員管理系統，商家夥伴可以查看會員的註冊日期、活躍程度、近期互動和消費累積。這有助於確定哪些會員需要加強開發，以及哪些會員有流失的可能，從而制定相關的行銷策略。",
        ],
      },
      {
        type: "h3",
        content: ["會員系統優勢3》分析購買紀錄"],
      },
      {
        type: "body",
        content: [
          "會員系統可以儲存會員的消費紀錄，包括購買日期、金額和支付方式等。這有助於您跟蹤銷售成果，預測銷售趨勢，並根據過去的購買行為提供個性化的建議和推薦。瞭解會員的消費習慣是成功的關鍵。會員系統可以完整記錄會員的購買頻率、偏好的產品或服務、購物籃內的項目等。藉由這些資訊來策劃促銷活動或是新的產品，提供符合會員需求服務，並提高ROI。",
        ],
      },
      {
        type: "h3",
        content: ["會員系統優勢4》提高會員忠誠度"],
      },
      {
        type: "body",
        content: [
          "透過會員系統，您可以獎勵忠誠的會員。通過提供折扣、獨家促銷或紅利計劃，商家夥伴可以鼓勵會員持續回購並保持忠誠。這有助於建立穩定的會員基礎，並提高會員留存率。",
        ],
      },
      {
        type: "callout",
        content: [
          "上千個品牌都已經使用夯客，數位轉型正夯，你還在猶豫什麼？快來試試吧！",
        ],
        cta: {
          text: "立即註冊",
          action: "https://hot.cak.ee/joinus",
        },
      },
      {
        type: "divider",
      },
      {
        type: "h2",
        content: ["會員管理系統5大功能，會員經營更上一層樓"],
      },
      {
        type: "image",
        content: [
          {
            src: "https://offcial-website-blog-assets.s3.ap-northeast-1.amazonaws.com/qatalk/whatiscrm/04.png",
            alt: "會員預約系統推薦夯客",
          },
        ],
      },
      {
        type: "body",
        content: [
          "現在，讓我們看看會員管理系統的核心功能，這些功能可以協助美業商家更有效地管理您的會員群體：",
        ],
      },
      {
        type: "h3",
        content: ["會員系統功能1》管理會員預約"],
      },
      {
        type: "body",
        content: [
          "屬於美業最重要的功能莫過於直接提供會員直接在線上預約的功能。好的會員系統可以連結會員資訊，或是串接通訊或社群軟體（例如LINE官方帳號），透過通訊或社群軟體提供預約服務，不但方便會員在手機上輕鬆進行預約，系統自動顯示可預約時間並進行安排，方便商家進行預約管理，告別手忙腳亂！",
        ],
      },
      {
        type: "h3",
        content: ["會員系統功能2》會員分群標籤"],
      },
      {
        type: "body",
        content: [
          "標籤是用來分類和分組會員的標記。可以使用不同的標籤來識別不同的會員群體，並針對其需求提供特定的促銷活動或內容。例如針對一個期間內消費達一定金額以上的客人，可以標籤為VIP等級；依據職業、地區分類，也有助於提升你對會員的辨識。在行銷策略上，會員系統可以針對標籤，個別指定發送特別的活動資訊或優惠，做好精準行銷，節省溝通成本。",
        ],
      },
      {
        type: "h3",
        content: ["會員系統功能3》儲值金 / 課程點數管理"],
      },
      {
        type: "body",
        content: [
          "在許多沒有導入會員系統的美業工作室，客人購買課程或儲值金額還在使用點數券或是禮券，如果忘記帶，則無法享有優惠，或者透過紙本紀錄有遺失的風險。而導入數位會員系統的好處在於將儲值資料與會員資料整合，會員可以直接查看儲值紀錄與剩餘額度，也能看到目前持有票券張數。而透過數位會員系統，除了可以提升會員的使用體驗，也方便商家清楚掌握已經銷售多少課程。",
        ],
      },
      {
        type: "h3",
        content: ["會員系統功能4》定期產出客群分析報告"],
      },
      {
        type: "body",
        content: [
          "會員系統通常提供數據分析和行銷工具，幫助商家了解會員的活動和趨勢，有助於制定更好的經營策略和業務決策。",
        ],
      },
      {
        type: "h3",
        content: ["會員系統功能5》自動化行銷和預約通知"],
      },
      {
        type: "body",
        content: [
          "自動化行銷和預約通知功能是會員系統中一大亮點功能。在未導入系統之前，需要手動用LINE針對已經預約的會員發送提醒通知。現在會員系統可以協助你完成這些麻煩事！透過排程自動發送提醒通知或是優惠資訊給會員。這有助於保持會員參與度，透過互動的方式，讓會員對你產生印象，也能透過提供即時資訊，提升會員來店的動機。",
        ],
      },
      {
        type: "callout",
        content: [
          "上千個品牌都已經使用夯客，數位轉型正夯，你還在猶豫什麼？快來試試吧！",
        ],
        cta: {
          text: "立即註冊",
          action: "https://hot.cak.ee/joinus",
        },
      },
      {
        type: "divider",
      },
      {
        type: "h2",
        content: ["會員系統費用如何計算？夯客小額月租經濟實惠"],
      },
      {
        type: "body",
        content: [
          "瞭解了會員系統的優勢以及功能後，讓我們來了解導入會員系統的費用。會員系統的費用通常依據不同的方案與擴充功能而有所不同。以下是夯客美業會員系統的方案價格，並皆以分店 / 每月計算：",
        ],
      },
      {
        type: "image",
        content: [
          {
            src: "https://offcial-website-blog-assets.s3.ap-northeast-1.amazonaws.com/qatalk/whatiscrm/05.png",
            alt: "Basic基本方案",
          },
        ],
      },
      {
        type: "image",
        content: [
          {
            src: "https://offcial-website-blog-assets.s3.ap-northeast-1.amazonaws.com/qatalk/whatiscrm/06.png",
            alt: "Star新星方案",
          },
        ],
      },
      {
        type: "image",
        content: [
          {
            src: "https://offcial-website-blog-assets.s3.ap-northeast-1.amazonaws.com/qatalk/whatiscrm/07.png",
            alt: "Pro商務方案",
          },
        ],
      },
      {
        type: "body",
        content: [
          "夯客會員系統不綁年約，可以依據帳號月繳，並且不收取其他建置或開通費用，也不限制預約數與會員數，是導入預約和會員系統的最佳選擇！",
        ],
      },
      {
        type: "callout",
        content: [
          "上千個品牌都已經使用夯客，數位轉型正夯，你還在猶豫什麼？快來試試吧！",
        ],
        cta: {
          text: "立即註冊",
          action: "https://hot.cak.ee/joinus",
        },
      },
      {
        type: "divider",
      },
      {
        type: "h2",
        content: ["會員系統推薦 HOTCAKE夯客，打造更完整會員管理"],
      },
      {
        type: "body",
        content: [
          "在數位化時代，會員系統已經成為經營成功的不可或缺的工具。會員系統不僅可以提高會員忠誠度，還可以提供寶貴的數據和洞察，幫助商家做出更明智的行銷和業務決策。美容工作室剛開業，還在苦惱要用使用哪種會員系統嗎？推薦你HOTCAKE夯客會員系統。夯客提供各種功能，包括會員標籤、黑名單/觀察名單、儲值金/紅利點數、定期報告、自動化通知等，幫助工作繁忙的你有效管理會員與預約，提升服務品質，讓顧客滿意成為你的忠實會員！",
        ],
      },
      {
        type: "h3",
        content: ["延伸閱讀："],
      },
      {
        type: "body",
        content: [
          "屬於美業最重要的功能莫過於直接提供會員直接在線上預約的功能。好的會員系統可以連結會員資訊，或是串接通訊或社群軟體（例如LINE官方帳號），透過通訊或社群軟體提供預約服務，不但方便會員在手機上輕鬆進行預約，系統自動顯示可預約時間並進行安排，方便商家進行預約管理，告別手忙腳亂！",
        ],
      },
      {
        type: "hyperlink",
        content: [
          {
            title: "奧客 Get Out! 夯客幫你找到好客人",
            href: "https://post.cak.ee/2022001",
          },
        ],
      },
      {
        type: "hyperlink",
        content: [
          {
            title: "預約好頭痛？你不能不知的夯客四大優勢",
            href: "https://post.cak.ee/2022002",
          },
        ],
      },
      {
        type: "hyperlink",
        content: [
          {
            title: "建立會員資料庫，了解你的客人",
            href: "https://post.cak.ee/2022003",
          },
        ],
      },
    ],
  },
];
