export const translations = {
  he: {
    // Header & Navigation
    home: 'בית',
    extensions: 'התוספים',
    contact: 'צור קשר',
    nosafix: 'נוספיקס',
    developers: 'למפתחים',
    nosafixTitle: 'כלים נוספים מבית תוספיקס',
    nosafixGridDesc: 'כלים שימושיים נוספים שנועדו להקל עליכם.',
    developersTitle: 'כלים ומידע למפתחים',
    comingSoon: 'בקרוב...',
    language: 'שפה',
    menu: 'תפריט',
    toggleTheme: 'שנה ערכת נושא',
    share: 'שתף',
    shareTitle: 'תוספיקס - תוספי כרום שימושיים',
    shareText: 'מצאתי אתר מעולה עם תוספי כרום חכמים ושימושיים. כדאי לבדוק!',
    linkCopied: 'הקישור הועתק!',
    
    // Site
    siteTitle: 'תוספיקס',
    backToTop: 'חזרה למעלה',
    quickLinks: 'קישורים מהירים',

    // Hero Section (Home)
    heroTitle: 'תוספי כרום שימושיים',
    heroSubtitle: 'כלי חובה לכל משתמש!',
    discoverExtensions: 'גלה את התוספים',

    // About Section
    aboutTitle: 'אודותינו',
    aboutText: 'ברוכים הבאים ל"תוספיקס" – הבית לתוספי כרום חכמים ושימושיים באמת! אנו יוצרים תוספים שמייעלים את חוויית המשתמש, חוסכים זמן ומפשטים משימות יומיומיות בצורה חכמה. ב"תוספיקס" אנו מאמינים שתוספים צריכים להיות קלים לשימוש, מועילים ומותאמים בדיוק לצרכים של המשתמשים. לכן, כל תוסף שאנו מפתחים נותן פתרון אמיתי לבעיות שכיחות, כדי להפוך את העבודה שלך למהירה ונוחה יותר.',
    userFocused: 'מותאם למשתמש',
    userFocusedDesc: 'תוספים שנבנו בהתאם לצרכים האמיתיים של המשתמשים',
    timeSaving: 'חיסכון בזמן',
    timeSavingDesc: 'כלים שמייעלים משימות יומיומיות וחוסכים זמן יקר',
    secureReliable: 'בטוח ואמין',
    secureReliableDesc: 'תוספים בטוחים עם שמירה מלאה על פרטיות המשתמש',
    easyToUse: 'קל לשימוש',
    easyToUseDesc: 'ממשק פשוט ואינטואיטיבי שכל אחד יכול להשתמש בו',
    activeExtensions: 'תוספים פעילים',

    // Extensions Grid
    ourExtensions: 'התוספים שלנו',
    ourExtensionsDesc: 'גלה את קולקציית התוספים החכמים שלנו, כל אחד מתמחה בפתרון בעיה ספציפית',
    readMore: 'קרא עוד',

    // Grid Descriptions
    notiForumGridName: 'Noti',
    notiForumGridDesc: 'תוסף למעקב אחר התראות בפורומים – חוסך זמן בכך שהוא מרכז עבורך התראות ממגוון פורומים, כך שלא תצטרך לבדוק כל אחד בנפרד.',
    yaminaGridDesc: 'תוסף ליישור דפי LTR ל-RTL – הופך אוטומטית עמודים באנגלית לקריאים ונוחים לדוברי עברית.',
    netSkinGridDesc: 'NetSkin מחליף את דף החסימה הסטנדרטי של נטפרי בעשרות עיצובים מרהיבים, דינמיים וניתנים להתאמה אישית מלאה.',
    hebrewDateGridDesc: 'מציג תאריך עברי בחלונית קופצת (tooltip) בעת ריחוף מעל תאריך לועזי.',
    myEmojiGridDesc: "העלה, נהל, חפש, והוסף אימוג'ים מותאמים אישית משלך לצ'אטים, מיילים, רשתות חברתיות ועוד. כולל אפשרות מתקדמת להסרת רקע!",
    edgeOpenerGridDesc: "פותח את הטאב הנוכחי בדפדפן Microsoft Edge או מעתיק את הכתובת.",

    // Cutfix Tool
    cutfix: 'Fix remover',
    cutfixDescription: 'מסיר רקעים חכם וחיתוך אוטומטי של שוליים שקופים.',
    cutfixPageTitle: 'Fix remover - מסיר רקעים חכם',
    cutfixPageSubtitle: 'העלה תמונה, והקסם יקרה. הסרת רקע וחיתוך שוליים שקופים - אוטומטית.',
    selectImage: 'בחר תמונה',
    supportedFiles: 'קבצי PNG, JPG, WEBP נתמכים',
    removeBgAndTrim: 'הסר רקע וחתוך שוליים',
    trimOnly: 'חתוך שוליים שקופים בלבד',
    removeBgAndTrimDesc: 'הסרת רקע מבוססת AI וחיתוך חכם של שוליים.',
    trimOnlyDesc: 'חיתוך שוליים שקופים מקובץ PNG קיים.',
    processingImage: 'מעבד את התמונה, נא להמתין...',
    trimmingEdges: 'חותך שוליים שקופים...',
    originalImage: 'תמונה מקורית',
    processedImage: 'תמונה מעובדת',
    downloadImage: 'הורד תמונה',
    uploadAnotherImage: 'העלה תמונה אחרת',
    unsupportedFileType: 'סוג קובץ לא נתמך. נא לבחור קובץ PNG, JPG או WEBP.',
    fileTooLarge: (size: number) => `הקובץ גדול מדי. הגודל המקסימלי הוא ${size}MB.`,
    serverError: (status: number, text: string) => `שגיאת שרת (${status}): ${text}`,
    processingError: 'אופס, משהו השתבש. נסה שוב מאוחר יותר.',

    // Live Music Tool
    liveMusic: 'לייב מיוזיק',
    liveMusicDescription: 'האזן לתחנות רדיו מוזיקה יהודית בשידור חי.',
    kolChaiMusic: 'קול חי מיוזיק',
    kolPlay: 'קול פליי',
    tokerFm: 'טוקר FM',
    jewishRadioNetwork: 'Jewish Radio Network',
    jewishMusicStream: 'Jewish Music Stream',
    nowPlaying: 'מנגן כעת',


    // Developers Page
    devIntro: 'ברוכים הבאים למרכז המפתחים של תוספיקס. כאן תמצאו תיעוד עבור ממשקי API וכלים שונים שאנו מציעים.',
    cutfixApiTitle: 'Fix remover - API להסרת רקע',
    cutfixApiDesc: 'API פשוט ונוח להסרת רקע מתמונות באופן פרוגרמטי. מושלם לשילוב באפליקציות, אתרים או סקריפטים אישיים.',
    endpoint: 'כתובת (Endpoint)',
    method: 'שיטה (Method)',
    body: 'גוף הבקשה (Body)',
    bodyDesc: `הבקשה חייבת להיות מסוג 'multipart/form-data' ולהכיל שדה בודד:`,
    fieldName: 'שם השדה',
    file: 'קובץ',
    fieldDesc: 'קובץ התמונה שברצונך לעבד.',
    supportedFormats: 'פורמטים נתמכים',
    fileSizeLimit: 'מגבלת גודל קובץ',
    successResponse: 'תשובה מוצלחת (Success Response)',
    successResponseDesc: 'כאשר העיבוד מצליח, ה-API יחזיר:',
    statusCode: 'קוד סטטוס',
    contentType: 'סוג תוכן',
    responseBody: 'גוף התשובה',
    responseBodyDesc: 'המידע הבינארי של קובץ התמונה המעובד בפורמט PNG.',
    errorResponse: 'תשובות שגיאה (Error Responses)',
    error400: 'בקשה שגויה (לדוגמה, סוג קובץ לא נתמך או קובץ חסר).',
    error500: 'שגיאת שרת פנימית במהלך עיבוד התמונה.',
    codeExamples: 'דוגמאות קוד',
    jsExample: 'דוגמה ב-JavaScript (Fetch API)',
    curlExample: 'דוגמה ב-cURL',
    templeTimerTitle: 'טיימר בית המקדש',
    templeTimerDesc: 'ווידג\'ט פשוט המציג טיימר דינמי הסופר את הזמן שחלף מאז חורבן בית המקדש השני, זמין בעברית ובאנגלית, וקל להטמעה.',
    livePreview: 'תצוגה מקדימה חיה',
    embedCode: 'קוד להטמעה',
    embedInstructions: 'אנו מציעים שתי דרכים להטמיע את הטיימר באתרכם. הדרך האוטומטית מומלצת לחווית המשתמש הטובה ביותר.',
    customization: 'התאמה אישית',
    customizationDesc: 'ניתן לשנות את הגודל של חלונית הטיימר על ידי שינוי הערכים `width` (רוחב) ו-`height` (גובה) בקוד ה-iframe, כדי להתאים אותו באופן מושלם לעיצוב האתר שלכם.',
    credits: 'קרדיטים',
    creditsDesc_part1: 'הטיימר משתמש בספריית ה-JavaScript ',
    creditsDesc_link: 'SecondTempleTimerLibrary',
    creditsDesc_part2: ' לחישוב הזמן.',
    viewOnGitHub: 'צפה ב-GitHub',
    liveDemos: 'הדגמה חיה',
    liveDemoHe: 'קישור לגרסה בעברית',
    liveDemoEn: 'קישור לגרסה באנגלית',
    embedAutoTitle: '1. הטמעה אוטומטית (מומלץ)',
    embedAutoStep1: 'שלב 1: הדביקו את ה-`<div>` הבא במקום בו תרצו שהטיימר יופיע:',
    embedAutoStep2: 'שלב 2: הדביקו את קטע ה-`<script>` הבא לפני תגית הסגירה `</body>`:',
    embedManualTitle: '2. הטמעה ידנית (גרסה יחידה)',
    embedManualDesc: 'אם אתם מעדיפים לקבוע גרסה ספציפית שתמיד תוצג, השתמשו באחד מהקודים הבאים.',
    embedManualHe: 'גרסה בעברית',
    embedManualEn: 'גרסה באנגלית',
    license: 'רישיון',
    licenseDesc: 'פרויקט זה מופץ תחת רישיון MIT.',
    
    // Extension Names & Descriptions
    notiForumName: 'NotiForum',
    notiForumDesc: 'תוסף כרום מתקדם המיועד לפורומים מבוססי NodeBB ו-XenForo, המספק התראות בזמן אמת ישירות לדפדפן שלך.',
    yaminaName: 'ימינה',
    yaminaDesc: '"ימינה" הוא תוסף דפדפן חכם שפותח כדי לשפר את חוויית הקריאה בעברית באינטרנט. התוסף משנה באופן אוטומטי את כיווניות הדפים ל-RTL (מימין לשמאל) בדפים שאינם מוגדרים כך מראש, תוך התחשבות בהעדפות המשתמש. עם ממשק נוח ותכונות מתקדמות, "ימינה" מאפשר לך להתאים אישית את חוויית הגלישה שלך בקלות וביעילות.',
    netSkinName: 'NetSkin',
    netSkinDesc: 'הפכו כל חסימה לחוויה ויזואלית! NetSkin מחליף את דף החסימה האפור והסטנדרטי של נטפרי בעולם שלם של עיצובים מרהיבים ודינמיים. במקום דף סטנדרטי, תיהנו מעשרות עיצובים המותאמים אישית לסוג החסימה, בין אם מדובר באתר חסום, קובץ לבדיקה או אתר בפיתוח. התוסף אף מזהה באופן חכם מדוע אתר נחסם לפי תגית אישית ומציג לכם את שמה! עם אפשרויות התאמה אישיות מתקדמות, שליטה מלאה ובחירה בין מצבים אקראיים או קבועים, גלישה בטוחה מעולם לא נראתה טוב יותר.',
    hebrewDateName: 'מציג תאריך עברי',
    hebrewDateDesc: 'האם אי פעם גלשתם ברשת, נתקלתם בתאריך לועזי חשוב – בין אם בכתבה, ביומן, בפורום או ברשת חברתית – ותהיתם מהו התאריך העברי המדויק? התוסף \'Hebrew Date converter\' נועד לענות בדיוק על הצורך הזה! הוא משמש כממיר תאריכים אישי וזמין, המאפשר לכם לראות את התאריך העברי המקביל בלחיצת-ריחוף פשוטה, בלי לעזוב את הדף או להשתמש בכלים חיצוניים. הפכו את חווית הגלישה שלכם ליעילה ואינפורמטיבית יותר עם ההמרה המיידית הזו.',
    myEmojiName: 'אימוג\'י אישי',
    myEmojiDesc: "הפוך את התקשורת הדיגיטלית שלך לאישית ויצירתית יותר עם 'My emoji'! תוסף כרום זה מאפשר לך לשבור את השגרה של האימוג'ים המוכרים וליצור אוסף פרטי משלך, המבוסס על התמונות וקבצי ה-SVG האהובים עליך. העלה בקלות קבצי PNG, JPG, GIF, WEBP ו-SVG משלך ונהל אותם בממשק נוח וידידתי בעברית. בלחיצת כפתור, העתק את האימוג'י שבחרת ישירות ללוח שלך, מוכן להדבקה בצ'אטים, מיילים, רשתות חברתיות, מסמכים, ובכל מקום אחר שבו תרצה להוסיף טאץ' ייחודי. עם אפשרויות לחיפוש, מיון, עריכת שמות, הגדרת גודל מועדף, גיבוי באמצעות ייצוא/ייבוא, ואפילו הסרת רקע מתקדמת (באמצעות API חיצוני לבחירתך), 'My emoji' נותן לך את כל הכלים ליצור ולהשתמש באוסף האימוג'ים המושלם עבורך. כל האימוג'ים שלך נשמרים באופן מאובטח ומקומי על המחשב שלך, תוך שמירה מלאה על פרטיותך. התקן עכשיו והתחל להביע את עצמך בדרך חדשה ומרגשת!",
    edgeOpenerName: 'פותחן Edge',
    edgeOpenerDesc: "מעבר מהיר מכרום לאדג'! פתחו את הדף הנוכחי בלחיצה אחת ב-Microsoft Edge. כולל העתקה אוטומטית ללוח אם הפתיחה הישירה נכשלת.",

    // Contact Page
    contactTitle: 'צור קשר',
    contactSubtitle: 'יש לך שאלה, הערה או רעיון? נשמח לשמוע ממך!',
    contactFormTitle: 'שלחו לנו הודעה',
    contactFormSubtitle: 'אנו נענה בהקדם האפשרי',
    nameLabel: 'שם מלא',
    phoneLabel: 'טלפון (אופציונלי)',
    emailLabel: 'כתובת דואר אלקטרוני',
    messageLabel: 'הודעה',
    namePlaceholder: "הכנס את שמך המלא",
    phonePlaceholder: "05X-XXX-XXXX",
    emailPlaceholder: "your.email@example.com",
    messagePlaceholder: "כתבו כאן את הודעתכם...",
    submitButton: 'שלח הודעה',
    submittingButton: 'שולח...',
    successMessage: 'ההודעה נשלחה בהצלחה!',
    errorMessage: 'אירעה שגיאה. נסה שוב מאוחר יותר.',
    contactInfo: 'פרטי התקשרות',

    // Extension Layout
    heroTagline: 'תוסף כרום',
    keyFeatures: 'תכונות עיקריות',
    installation: 'התקנה',
    privacyPolicy: 'מדיניות פרטיות',
    chromeWebStore: 'חנות הכרום',
    supportedForums: 'פורומים נתמכים',
    notiInstallDesc: 'להורדה מחנות האינטרנט של Chrome.',
    copy: 'העתק',
    copied: 'הועתק!',
    copyError: 'שגיאה',
    download: 'הורדה',
    copyPolicyTooltip: 'העתק מדיניות',
    downloadPolicyTooltip: 'הורד מדיניות כקובץ txt.',

    // NotiForum Page (New design)
    notiPageTitle: 'נוטיפורום',
    notiPageSubtitle: 'כל הפורומים שלך. תיבת התראות אחת.',
    notiPageDescription: 'NotiForum הוא הפתרון המושלם שנועד לחסוך לכם זמן ולרכז עבורכם את כל ההתראות וההודעות הפרטיות במקום אחד, נגיש ומעוצב, ישירות מהדפדפן.',
    notiFeaturesSectionTitle: 'תכונות',
    notiFeaturesSectionSubtitle: 'כל מה שצריך כדי להישאר מעודכן, בלי מאמץ',
    notiFeatureUnifiedInboxTitle: 'תיבת דואר נכנס מאוחדת',
    notiFeatureUnifiedInboxDesc: 'קבלו את כל ההתראות וההודעות הפרטיות מכל הפורומים שלכם בפיד אחד מסודר. סוף סוף לא צריך לקפוץ בין טאבים!',
    notiFeatureCustomizationTitle: 'התאמה אישית מלאה',
    notiFeatureCustomizationDesc: 'בחרו מבין ערכות נושא מרהיבות, עברו למצב כהה, הגדירו צליל ייחודי לכל פורום או אפילו העלו קבצי סאונד משלכם!',
    notiFeatureFlexibleUITitle: 'ממשק גמיש: Popup או סרגל צד',
    notiFeatureFlexibleUIDesc: 'בחרו להציג את התוסף בחלון קופץ קלאסי, או קבעו אותו בסרגל הצד של הדפדפן לגישה מהירה ונוחה שעובדת תמיד.',
    notiFeatureWideSupportTitle: 'תמיכה רחבה והוספה קלה',
    notiFeatureWideSupportDesc: 'התוסף מגיע עם רשימת פורומים מוכנה, ומאפשר לכם להוסיף בקלות כל פורום מבוסס NodeBB או XenForo. הוא אפילו יזהה את סוג הפורום אוטומטית!',
    notiFeaturePerformanceTitle: 'יעילות וביצועים',
    notiFeaturePerformanceDesc: 'עם מנגנון בדיקות מהיר שרץ ברקע וצריכת משאבים נמוכה, NotiForum שומר אתכם מעודכנים מבלי להאט את חווית הגלישה.',
    notiFeaturePrivacyTitle: 'פרטיות מעל הכל',
    notiFeaturePrivacyDesc: 'כל המידע שלכם, כולל הגדרות וקבצים שהעליתם, נשמר באופן מקומי לחלוטין על המחשב שלכם. שום מידע אינו נשלח לשרתים חיצוניים.',
    notiSupportSectionTitle: 'תמיכה רחבה וגמישות מלאה',
    notiSupportSectionSubtitle: 'מרשימת ברירת המחדל ועד כל פורום שתוסיפו בעצמכם',
    andMore: 'ועוד...',
    notiInstallSectionTitle: 'התקנה',
    notiInstallSectionDesc: 'להתקנה מחנות התוספים Chrome',
    notiPrivacySectionTitle: 'מדיניות פרטיות',
    
    // MyEmoji Features
    myEmojiFeature1Title: 'העלאה וניהול אישיים',
    myEmojiFeature1Desc: 'העלה בקלות קבצי PNG, JPG, GIF, WEBP ו-SVG משלך ונהל אותם במקום אחד.',
    myEmojiFeature2Title: 'גודל מותאם אישית',
    myEmojiFeature2Desc: 'בחר את הגודל המדויק (בפיקסלים) שבו האימוג\'י יועתק ללוח, כולל אפשרות לגודל מותאם אישית.',
    myEmojiFeature3Title: 'חיפוש ומיון מתקדמים',
    myEmojiFeature3Desc: "מצא בקלות את האימוג'י הרצוי באמצעות חיפוש טקסט ומיין את האוסף שלך לפי שם או תאריך הוספה.",
    myEmojiFeature4Title: 'גישה מהירה לאחרונים',
    myEmojiFeature4Desc: "האימוג'ים שהשתמשת בהם לאחרונה מופיעים בראש הפופאפ לגישה מיידית ונוחה.",
    myEmojiFeature5Title: 'ייבוא וייצוא קלים',
    myEmojiFeature5Desc: 'גבה את כל אוסף האימוג\'ים שלך לקובץ Zip פשוט, וייבא אותו בקלות למחשב אחר או אחרי התקנה מחדש.',
    myEmojiFeature6Title: 'הסרת רקע בקליק',
    myEmojiFeature6Desc: 'חבר את חשבון ה-remove.bg שלך (דורש API Key מהמשתמש) והסר רקעים מתמונות בלחיצת כפתור ליצירת אימוג\'ים נקיים. (אופציונלי)',
    myEmojiBonusSectionTitle: 'קבצי בונוס',
    myEmojiBonusCardTitle: 'אימוג\'ים חרדיים',
    myEmojiBonusCardDesc: 'להורדה קובץ בונוס המכיל אימוג\'ים חרדיים בקובץ zip לייבוא לתוסף.',
    myEmojiBonusCardCredit: 'קרדיט: האימוג\'ים נוצרו ע"י משתמשי פורום פרוג.',
    // FIX: Renamed key to match English translation and component usage.
    myEmojiBonusDownloadBtn: 'הורד אימוג\'ים חרדיים',

    // HebrewDate Features
    hebrewDateFeature1Title: 'המרה אוטומטית בריחוף',
    hebrewDateFeature1Desc: 'פשוט רחפו עם העכבר מעל תאריך לועזי נתמך, והמתינו כחצי שנייה. חלונית מידע קטנה (tooltip) תופיע באופן אוטומטי ליד הסמן עם התאריך העברי המלא.',
    hebrewDateFeature2Title: 'המרה מדויקת',
    hebrewDateFeature2Desc: 'התוסף משתמש באלגוריתמים אמינים (המבוססים על ספריית Hebcal) כדי להבטיח שהתאריך העברי המוצג יהיה הנכון והמדויק ביותר, כולל התחשבות בשנים מעוברות.',
    hebrewDateFeature3Title: 'תאריך עברי מלא',
    hebrewDateFeature3Desc: 'התוסף מציג את התאריך העברי המלא בפורמט המוכר והקריא: יום בחודש (באותיות גימטריה), שם החודש העברי, ושנת היצירה העברית.',
    hebrewDateFeature4Title: 'נוחות ומהירות',
    hebrewDateFeature4Desc: 'חסכו זמן יקר! אין צורך להעתיק תאריכים, לפתוח אתרים חיצוניים או להשתמש במחשבונים. ההמרה מתבצעת מיידית בדף שאתם נמצאים בו.',
    hebrewDateFeature5Title: 'חוויה חלקה ונקייה',
    hebrewDateFeature5Desc: 'ההשהייה הקלה לפני הופעת הטולטיפ מונעת ממנו "לקפוץ" שלא לצורך. הוא ממוקם קרוב לסמן העכבר ונועד לא להפריע או להסתיר תוכן חשוב.',
    hebrewDateFeature6Title: 'תמיכה בתקנים נפוצים',
    hebrewDateFeature6Desc: 'כדי להבטיח זיהוי אמין, התוסף מתמקד בתאריכים המסומנים בצורה ברורה בקוד ה-HTML של האתרים (מאפיין datetime או data-numeric-value).',

    // NetSkin Features
    netSkinGalleryTitle: "גלריית עיצובים",
    netSkinGalleryDesc: "חלק מהעיצובים הזמינים בתוסף",
    netSkinFeature1Title: 'גלריה עשירה של עיצובים',
    netSkinFeature1Desc: 'בחרו מתוך למעלה מ-60 עיצובים ייחודיים, המחולקים לקטגוריות חכמות לפי סוג החסימה (חסום, בפיתוח, בדיקת אתר, קבצים ותגיות).',
    netSkinFeature2Title: 'זיהוי תגיות חכם',
    netSkinFeature2Desc: "לראשונה, דעו בדיוק למה אתר נחסם! NetSkin מזהה את התגית האישית שגרמה לחסימה ומציג לכם את שמה המלא, היישר משרתי נטפרי.",
    netSkinFeature3Title: 'שליטה מלאה והתאמה אישית',
    netSkinFeature3Desc: 'בחרו כיצד יוצגו העיצובים: במצב אקראי, אקראי מתוזמן (החלפה יומית/שעתית) או בחירה ספציפית של העיצוב האהוב עליכם לכל קטגוריה בנפרד.',
    netSkinFeature4Title: 'בריכת עיצובים אישית',
    netSkinFeature4Desc: 'אוהבים רק חלק מהעיצובים? סמנו אילו עיצובים ייכללו במצבים האקראיים, וצרו לעצמכם גלריה פרטית ומותאמת אישית.',
    netSkinFeature5Title: "התאמה קונטקסטואלית",
    netSkinFeature5Desc: "התוסף מזהה את סיבת החסימה ומאפשר לכם להגדיר סגנון עיצוב שונה לכל תרחיש, בין אם מדובר בבדיקת קובץ או באתר בפיתוח.",
    netSkinFeature6Title: "חווית משתמש מתקדמת",
    netSkinFeature6Desc: "ממשק הגדרות נוח ואינטואיטיבי, תמיכה מלאה במצב כהה (Dark Mode) ואפשרות לתצוגה מקדימה של כל עיצוב בלחיצת כפתור.",

    // Yamina Features
    yaminaHowItWorksTitle: 'כך זה עובד',
    yaminaHowItWorksDesc: 'הדגמה של יישור דף משמאל לימין (לפני) ומימין לשמאל (אחרי)',
    yaminaFeature1Title: 'יישור אוטומטי ל-RTL',
    yaminaFeature1Desc: 'משנה את כיווניות הדפים למימין לשמאל בדפים שאינם RTL, תוך התעלמות מדפים שכבר מוגדרים כ-RTL.',
    yaminaFeature2Title: 'בחירת מצב יישור',
    yaminaFeature2Desc: 'מאפשר לבחור בין יישור מלא (כולל אלמנטים) לבין יישור טקסט בלבד, כדי לשמור על מבנה הדף המקורי.',
    yaminaFeature3Title: 'רשימה שחורה מותאמת אישית',
    yaminaFeature3Desc: 'ניתן להוסיף אתרים או דפים ספציפיים לרשימה שחורה שבה התוסף לא יפעל, דרך דף ההגדרות או תפריט ההקשר.',
    yaminaFeature4Title: 'תפריט הקשר נוח',
    yaminaFeature4Desc: 'לחיצה ימנית על אייקון התוסף מאפשרת הוספה או הסרה מהירה של אתרים ודפים מהרשימה השחורה.',
    yaminaFeature5Title: 'ממשק ידידותי',
    yaminaFeature5Desc: 'דף הגדרות מעוצב ופשוט לשימוש, עם אפשרויות התאמה אישית מלאה.',
    yaminaFeature6Title: 'פרטיות מובטחת',
    yaminaFeature6Desc: 'התוסף פועל באופן מקומי, שומר נתונים רק במכשיר שלך, ולא משתף מידע עם צד שלישי.',


    // EdgeOpener Features
    edgeOpenerHowItWorksTitle: 'איך זה עובד',
    edgeOpenerHowItWorksDesc: 'מעבר קל ומהיר מכרום לאדג\' בלחיצה אחת',
    edgeOpenerFeature1Title: "פתיחה מיידית באדג'",
    edgeOpenerFeature1Desc: 'בלחיצת כפתור אחת, התוסף מנסה לפתוח את הכתובת של הטאב הנוכחי ישירות בדפדפן Microsoft Edge באמצעות הפרוטוקול הייעודי (microsoft-edge:).',
    edgeOpenerFeature2Title: "גיבוי חכם: העתקה ללוח",
    edgeOpenerFeature2Desc: 'במקרה שהפתיחה האוטומטית באדג\' אינה אפשרית (למשל, הפרוטוקול לא מוגדר במערכת), הכתובת המלאה של הדף הנוכחי תועתק אוטומטית ללוח ההעתקה שלכם.',
    edgeOpenerFeature3Title: 'תאימות לדפי אינטרנט סטנדרטיים',
    edgeOpenerFeature3Desc: 'התוסף מיועד לעבוד על כתובות אינטרנט רגילות המתחילות ב-http: או https:. הוא מזהה מתי מדובר בכתובת פנימית של הדפדפן (כמו chrome://extensions) ומודיע שאינו יכול לפעול.',

    // Privacy Policies
    notiForumPrivacyPolicy: `מדיניות הפרטיות של תוסף "NotiForum"
תאריך עדכון אחרון: 26 באוקטובר 2025

אנו, מפתחי "NotiForum" (להלן: "התוסף"), מחויבים לשמור על פרטיות המשתמשים שלנו. מדיניות פרטיות זו מסבירה כיצד אנו אוספים, משתמשים, מאחסנים ומגנים על המידע שלכם בעת שימוש בתוסף, המיועד לרכז, להציג ולנהל התראות מפורומים מבוססי NodeBB ו-XenForo.

השימוש בתוסף מהווה הסכמה למדיניות זו. העיקרון המנחה שלנו הוא פשוט: כל המידע שלכם נשאר באופן מקומי לחלוטין על המחשב שלכם. אנו לעולם לא אוספים או מעבירים מידע אישי לשרתים חיצוניים.

1. המידע שאנו אוספים

התוסף אוסף ומאחסן את סוגי המידע הבאים, אך ורק בדפדפן המקומי שלכם:

1.1. הגדרות המשתמש:

רשימת הפורומים למעקב: הכתובות והשמות של הפורומים שהוספתם, בין אם מרשימת ברירת המחדל ובין אם באופן ידני.
העדפות תפעוליות: תדירות בדיקת ההתראות, הגדרות צלילים (כולל עוצמת שמע ובחירת צליל לכל פורום), והעדפות התראות דפדפן.
העדפות מראה: ערכת הנושא שנבחרה, מצב התצוגה (בהיר/כהה/אוטומטי) ואופן התצוגה (חלון קופץ/סרגל צד).
מידע זה נשמר באמצעות chrome.storage.sync כדי לסנכרן את ההגדרות שלכם בין מכשירים המחוברים לאותו חשבון Google.

1.2. תוכן שהועלה על ידי המשתמש:

אייקונים מותאמים אישית: קבצי תמונה שהעליתם כדי לייצג פורומים שהוספתם.
צלילים מותאמים אישית: קבצי שמע שהעליתם כדי שימשו כצלילי התראה.
תוכן זה נשמר כטקסט (בפורמט Data URL) באמצעות chrome.storage.local והוא נשאר באופן בלעדי על המכשיר שלכם. אין לנו גישה לקבצים אלו והם לעולם אינם נשלחים מהמחשב שלכם.

1.3. נתוני התראות וחיבור:

תוכן ההתראות: טקסט, קישורים, ותאריכים של התראות והודעות פרטיות חדשות. מידע זה מאוחזר ישירות מהפורומים שהגדרתם.
מצב החיבור: התוסף שומר באופן זמני את מצב החיבור לכל פורום (האם החיבור הצליח או נכשל) ואת תוכן ההתראות האחרון.
מידע זה נשמר זמנית ב-chrome.storage.local כדי לנהל את תצוגת ההתראות ולזהות שינויים.

1.4. עוגיות אימות (Authentication Cookies):

התוסף ניגש לעוגיות (Cookies) השייכות לדומיינים של הפורומים שהגדרתם. גישה זו חיונית כדי לבצע בקשות מאומתות בשמכם ולקבל את ההתראות הרלוונטיות.
התוסף אינו אוסף, שומר או מעביר את העוגיות שלכם. הוא משתמש בהן באופן מקומי בלבד כפי שהדפדפן מאפשר.

2. כיצד אנו משתמשים במידע

המידע שנאסף משמש אך ורק למטרות הבאות:

תפעול מלא של התוסף: שליפת התראות, הצגתן בממשק, השמעת צלילים והצגת התראות דפדפן בהתאם להגדרות שבחרתם.
התאמה אישית של החוויה: שמירת העדפות המראה וההתנהגות שלכם כדי לספק חוויה עקבית.
שימוש בתוכן שהעליתם: הצגת האייקונים שהעליתם בממשק, ונגינת קבצי השמע שהעליתם בעת קבלת התראה.
אנו לא משתמשים במידע שלכם למטרות פרסום, ניתוח סטטיסטי, מעקב, או כל פעילות אחרת שאינה קשורה ישירות לתפקוד הליבה של התוסף.

3. שיתוף מידע עם צדדים שלישיים

אנחנו לא משתפים את המידע שלכם עם אף צד שלישי. התקשורת היחידה שמתבצעת היא ישירות מהדפדפן שלכם אל שרתי הפורומים שהגדרתם למעקב.

4. אחסון ואבטחת מידע

כל המידע נשמר באופן מקומי על המחשב שלכם באמצעות המנגנונים המאובטחים של Google Chrome (chrome.storage).
הגדרות מסונכרנות (chrome.storage.sync) מוגנות על ידי מנגנוני האבטחה של חשבון Google שלכם.
מידע מקומי (chrome.storage.local), כגון קבצים שהעליתם ומצב ההתראות, נגיש רק על המכשיר הספציפי בו אתם משתמשים.

5. זכויות המשתמש

שליטה מלאה: אתם יכולים לערוך, להוסיף או למחוק את רשימת הפורומים, ההגדרות, והקבצים שהעליתם בכל עת דרך דף ההגדרות של התוסף.
הסרה מלאה: הסרת התוסף מהדפדפן תמחק באופן מיידי ומוחלט את כל המידע שהתוסף שמר.

6. שינויים במדיניות הפרטיות

אנו עשויים לעדכן מדיניות זו בעתיד כדי לשקף שינויים בתוסף או בדרישות חנות Chrome. כל שינוי יפורסם בגרסה מעודכנת של התוסף.

7. יצירת קשר

לשאלות או הבהרות בנוגע למדיניות זו, אתם מוזמנים לפנות אלינו דרך אתר התוסף.

תודה שבחרתם ב-NotiForum`,
    yaminaPrivacyPolicy: `עודכן לאחרונה: 26 במרץ 2025

התוסף ימינה ("אנחנו") נועד לשנות באופן אוטומטי את כיווניות דפי אינטרנט ל-RTL (מימין לשמאל) כדי לשפר את חוויית הקריאה בעברית. מדיניות פרטיות זו מסבירה כיצד אנו מטפלים בנתוני משתמשים, תוך הבטחת שקיפות ועמידה בתקני פרטיות.

1. נתונים שאנו אוספים
התוסף ימינה אוסף את הנתונים הבאים:
- כתובות URL של אתרים: כאשר אתה מוסיף אתר או דף לרשימה השחורה (דרך תפריט ההקשר או דף ההגדרות), כתובת ה-URL של הכרטיסייה הפעילה נשמרת באופן מקומי במכשיר שלך באמצעות chrome.storage.local. זה נחוץ כדי לקבוע האם התוסף צריך ליישר את הכיווניות ל-RTL עבור אתרים או דפים מסוימים.

2. כיצד אנו משתמשים בנתונים שלך
כתובות ה-URL שנאספות משמשות אך ורק לניהול תכונת הרשימה השחורה, שמאפשרת לך לשלוט באילו אתרים או דפים התוסף לא ישנה את הכיווניות שלהם. הנתונים נשמרים באופן מקומי במכשיר שלך ואינם מועברים לשרתים חיצוניים או לצד שלישי.

3. אחסון ואבטחת נתונים
כל הנתונים שנאספים על ידי התוסף (כלומר, כתובות URL ברשימה השחורה) נשמרים באופן מקומי במכשיר שלך באמצעות chrome.storage.local. אין לנו גישה לנתונים אלה, והם אינם נשלחים לשרתים חיצוניים. הנתונים נשארים במכשיר שלך וניתנים לניהול או למחיקה על ידך דרך דף ההגדרות של התוסף.

4. שיתוף נתונים
אנו לא משתפים, מוכרים או חושפים נתונים שנאספים על ידי התוסף עם צד שלישי. התוסף פועל באופן מקומי לחלוטין בדפדפן שלך.

5. הרשאות וגישה
התוסף משתמש בהרשאות הבאות:
- "tabs": כדי לגשת לכתובת ה-URL של הכרטיסייה הפעילה לצורך ניהול הרשימה השחורה ועדכוני תפריט ההקשר.
- "content_scripts" עם "<all_urls>": כדי ליישר את הכיווניות ל-RTL בדפים שאינם RTL, תוך כיבוד הרשימה השחורה.
- "storage": כדי לשמור את ההגדרות שלך, כגון הרשימה השחורה ומצב היישור (מלא/טקסט בלבד).
- "contextMenus": כדי לספק תפריט הקשר להוספה/הסרה של אתרים מהרשימה השחורה.
הרשאות אלה משמשות אך ורק לספק את הפונקציונליות המרכזית של התוסף ואינן משמשות לאיסוף או מעקב אחר נתוני משתמש מעבר למה שנחוץ לתכונת הרשימה השחורה.

6. שליטת המשתמש
יש לך שליטה מלאה על הנתונים שנשמרים על ידי התוסף. אתה יכול לצפות, לערוך או להסיר כתובות URL מהרשימה השחורה בכל עת דרך דף ההגדרות של התוסף.

7. שינויים במדיניות הפרטיות
אנו עשויים לעדכן את מדיניות הפרטיות הזו מעת לעת. כל שינוי יבוא לידי ביטוי בדף זה עם תאריך "עודכן לאחרונה" מעודכן. אנו ממליצים לך לעיין במדיניות זו מעת לעת.

8. צור קשר
אם יש לך שאלות או חששות לגבי מדיניות הפרטיות הזו או נוהלי הנתונים של התוסף, אנא צור איתנו קשר באתר.

מדיניות פרטיות זו מסופקת כדי להבטיח שקיפות ועמידה בתקני פרטיות. אנו מחויבים להגן על פרטיותך ולספק חוויה בטוחה ושימושית.`,
    netSkinPrivacyPolicy: `עודכן לאחרונה: 22 באוגוסט 2025

מדיניות פרטיות זו מתארת את האופן שבו תוסף הדפדפן NetSkin ("התוסף") מטפל במידע. פרטיותך נמצאת בראש סדר העדיפויות שלנו, ומדיניות זו נועדה לספק לך שקיפות מלאה לגבי פעולת התוסף. אנו מתחייבים לצמצם את הגישה למידע למינימום ההכרחי לתפקודו התקין של התוסף.

1. איזה מידע אנו מעבדים?
התוסף NetSkin תוכנן מן היסוד תוך מחשבה על פרטיות. אנו איננו אוספים, שומרים או משדרים שום מידע אישי מזהה (PII - Personally Identifiable Information) כגון שמך, כתובת האימייל שלך, או היסטוריית הגלישה הכללית שלך. המידע היחיד שהתוסף מטפל בו מתחלק לשני סוגים:

הגדרות משתמש: כל ההגדרות שאתה בוחר עבור התוסף (כגון העיצוב המועדף, מצב הפעולה, הפעלה/כיבוי של קטגוריות) נשמרות באופן מקומי במחשב שלך באמצעות מנגנון chrome.storage.sync. מידע זה מסונכרן לחשבון הגוגל שלך כדי לשמור על עקביות בין מכשירים, אך אינו נשלח או נגיש לנו בשום צורה.
מידע תגיות אנונימי (לצורך תצוגה בלבד): אחת התכונות המרכזיות של התוסף היא היכולת להציג את שם התגית האישית שגרמה לחסימת אתר. כדי לממש זאת, וכאשר דף נחסם עקב תגית אישית שהגדרת בנטפרי (ורק במקרה זה), התוסף מבצע את הפעולות הבאות:
- התוסף מזהה את מזהה התגית (קוד מספרי אנונימי) מתוך המידע שנטפרי מספקת בדף החסימה.
- התוסף שולח אך ורק את המזהה המספרי הזה לשרת ה-API הרשמי של נטפרי (בכתובת https://netfree.link/api/tags/get-names).
- שרת נטפרי משיב עם שמה המילולי של התגית (לדוגמה: "חדשות").
- התוסף מציג לך את השם הזה בדף החסימה המעוצב.

חשוב להדגיש:
- המידע שנשלח (מזהה התגית) הוא אנונימי ואינו מקושר לחשבונך או לזהותך.
- המידע אינו נשמר על ידי התוסף לאחר קבלת שם התגית.
- הפעולה מתבצעת באופן מאובטח מול השרת הרשמי של נטפרי, למטרה זו בלבד.

2. הסבר על הרשאות התוסף
במהלך ההתקנה, התוסף מבקש את ההרשאות הבאות:

"גישה לנתונים שלך בכל האתרים" (<all_urls>): אנו מבינים שהרשאה זו נשמעת רחבה, ולכן חשוב לנו להסביר מדוע היא הכרחית. דף החסימה של נטפרי יכול להופיע בכל כתובת אינטרנט שתנסה לגלוש אליה. הרשאה זו נדרשת אך ורק כדי לאפשר לתוסף לזהות את קיומו של דף החסימה של נטפרי בדף שבו אתה נמצא.
אנו מתחייבים כי התוסף אינו קורא, אוסף, שומר, משנה או משדר תוכן של אף אתר אחר שבו אתה גולש. פעולתו מוגבלת אך ורק לזיהוי והחלפה של דף החסימה הספציפי של נטפרי.
storage: הרשאה זו נדרשת כדי לשמור את ההגדרות האישיות שלך (כפי שהוסבר בסעיף 1).
alarms: הרשאה זו משמשת לתזמון החלפת העיצוב האקראי במצב "אקראי מתוזמן", בהתאם להגדרותיך (למשל, פעם ביום).

3. שירותי צד ג'
NetFree API: כאמור, התוסף מתקשר עם ה-API הרשמי של נטפרי כדי לקבל שמות של תגיות.
שרתי תמונות: חלק מתמונות הרקע המשמשות בעיצובים השונים מאוחסנים על שרתים חיצוניים (כגון lovepik.com, stockcake.com וכו'). טעינת תמונות אלו היא פעולה סטנדרטית של הדפדפן, בדומה לטעינת תמונות בכל אתר אינטרנט.

4. שינויים במדיניות
אנו עשויים לעדכן מדיניות זו מעת לעת. כל שינוי מהותי יפורסם בדף התוסף בחנות האינטרנט של Chrome.

5. יצירת קשר
אם יש לך שאלות כלשהן לגבי מדיניות פרטיות זו, אנא צור איתנו קשר דרך אתר התוסף.

אנו מודים לך על השימוש ב-NetSkin!`,
    hebrewDatePrivacyPolicy: `מדיניות פרטיות - מציג תאריך עברי
תאריך עדכון אחרון: 26 באוקטובר 2025

התוסף "מציג תאריך עברי" (להלן: "התוסף") נוצר במטרה אחת: להציג לכם את התאריך העברי המקביל לתאריך לועזי שמופיע בדפי אינטרנט. פרטיותכם חשובה לנו מאוד, ולכן התוסף תוכנן להיות פשוט ובטוח ככל האפשר.

1. איסוף מידע
התוסף אינו אוסף, שומר, משדר או משתף שום מידע אישי או נתוני גלישה. פעולתו מתבצעת באופן מלא ומקומי בדפדפן שלכם.
התוסף אינו דורש הרשאות מיוחדות מעבר ליכולת לקרוא את תוכן הדף הנוכחי כדי לזהות תאריכים.

2. שימוש במידע
התוסף קורא את תוכן הדף באופן זמני כדי לאתר תאריכים לועזיים. המידע הזה מעובד באופן מיידי לצורך המרה לתאריך עברי, ואינו נשמר בשום מקום לאחר סגירת הדף.

3. צדדים שלישיים
התוסף אינו מתקשר עם שרתים חיצוניים או שירותי צד ג' כלשהם. כל חישובי התאריכים מתבצעים באופן מקומי.

4. שינויים במדיניות
כל שינוי במדיניות פרטיות זו יעודכן בתיאור התוסף בחנות האינטרנט של Chrome.

תודה על השימוש בתוסף!`,
    myEmojiPrivacyPolicy: `מדיניות פרטיות - אימוג'י אישי (My Emoji)
תאריך עדכון אחרון: 26 באוקטובר 2025

אנו, מפתחי "אימוג'י אישי" (להלן: "התוסף"), מחויבים להגן על פרטיות המשתמשים שלנו. מדיניות זו מסבירה כיצד אנו מטפלים במידע שלכם. העיקרון המנחה אותנו הוא שכל המידע שלכם הוא שלכם בלבד, ונשאר על המחשב שלכם.

1. איסוף ואחסון מידע
התוסף מאפשר לכם להעלות ולנהל קבצי תמונה (אימוג'ים). כל הקבצים שאתם מעלים, יחד עם הגדרותיכם (כגון שמות האימוג'ים, גודל מועדף וסדר המיון), נשמרים באופן מאובטח ומקומי על המחשב שלכם באמצעות מנגנון chrome.storage.local.
אנו לעולם לא ניגשים, אוספים, מעבירים או משתפים את האימוג'ים או ההגדרות שלכם עם שרתים חיצוניים או צד שלישי כלשהו.

2. גיבוי ושחזור (ייצוא/ייבוא)
התוסף מציע אפשרות לייצא את אוסף האימוג'ים שלכם לקובץ Zip. פעולה זו מתבצעת באופן יזום על ידכם בלבד, והקובץ נשמר במקום שתבחרו במחשבכם. תהליך הייבוא דומה ומאפשר לכם לשחזר את האוסף מקובץ גיבוי מקומי.

3. אינטגרציה עם שירותי צד שלישי (אופציונלי)
התוסף מציע אינטגרציה אופציונלית עם שירות הסרת הרקע remove.bg.
- כדי להשתמש בתכונה זו, עליכם להזין באופן ידני מפתח API (API Key) אישי שלכם מחשבון remove.bg.
- מפתח ה-API נשמר באופן מאובטח ומקומי על המחשב שלכם.
- כאשר אתם בוחרים להסיר רקע מתמונה, התוסף שולח את התמונה ישירות לשרתי remove.bg לצורך עיבוד, בהתאם לתנאי השימוש ומדיניות הפרטיות שלהם. אנו לא שולחים מידע נוסף.
- השימוש בתכונה זו הוא על אחריותכם בלבד. אם לא תזינו מפתח API, התוסף לא יתקשר עם שירות זה.

4. הרשאות
התוסף דורש הרשאת "storage" כדי לשמור את המידע שלכם באופן מקומי, והרשאת "clipboardWrite" כדי לאפשר לכם להעתיק את האימוג'ים ללוח.

5. הסרת התוסף
הסרת התוסף מהדפדפן תמחק באופן סופי את כל האימוג'ים וההגדרות ששמרתם.

תודה על השימוש ב"אימוג'י אישי"!`,
    edgeOpenerPrivacyPolicy: `מדיניות פרטיות - פותחן Edge
תאריך עדכון אחרון: 26 באוקטובר 2025

התוסף "פותחן Edge" (להלן: "התוסף") תוכנן לפעול בפשטות ובשקיפות מלאה. פרטיותך חשובה לנו, ומדיניות זו מסבירה את פעולתו.

1. איסוף מידע
התוסף אינו אוסף, שומר או משדר כל מידע אישי או נתוני גלישה.

2. פעולת התוסף
כאשר אתה לוחץ על סמל התוסף, הוא מבצע שתי פעולות בלבד:
א. קריאת כתובת ה-URL של הלשונית הפעילה הנוכחית.
ב. ניסיון לפתוח את הכתובת הזו בדפדפן Microsoft Edge באמצעות פרוטוקול "microsoft-edge:".
ג. במקרה שהפתיחה נכשלת, התוסף מעתיק את כתובת ה-URL ללוח ההעתקה שלך.
המידע על כתובת ה-URL משמש באופן מיידי לפעולות אלה בלבד ואינו נשמר או נשלח לשום מקום.

3. הרשאות
התוסף דורש את ההרשאות הבאות:
- "tabs": כדי לקרוא את כתובת ה-URL של הלשונית הפעילה.
- "clipboardWrite": כדי להעתיק את הכתובת ללוח במקרה הצורך.

התוסף אינו מתקשר עם שרתים חיצוניים. כל הפעולות מתבצעות באופן מקומי לחלוטין.

תודה על השימוש ב"פותחן Edge"!`,
  },
  en: {
    // Header & Navigation
    home: 'Home',
    extensions: 'Extensions',
    contact: 'Contact',
    nosafix: 'Nosafix',
    developers: 'For Developers',
    nosafixTitle: 'More Tools from Tosafix',
    nosafixGridDesc: 'More useful tools designed to make your life easier.',
    developersTitle: 'Tools & Info for Developers',
    comingSoon: 'Coming Soon...',
    language: 'Language',
    menu: 'Menu',
    toggleTheme: 'Toggle Theme',
    share: 'Share',
    shareTitle: 'Tosafix - Useful Chrome Extensions',
    shareText: 'I found a great site with smart and useful Chrome extensions. You should check it out!',
    linkCopied: 'Link copied!',
    
    // Site
    siteTitle: 'Tosafix',
    backToTop: 'Back to Top',
    quickLinks: 'Quick Links',

    // Hero Section (Home)
    heroTitle: 'Useful Chrome Extensions',
    heroSubtitle: 'Must-have tools for every user!',
    discoverExtensions: 'Discover Extensions',

    // About Section
    aboutTitle: 'About Us',
    aboutText: 'Welcome to "Tosafix" – your home for smart and truly useful Chrome extensions! We create extensions that streamline the user experience, save time, and simplify daily tasks in a smart way. At "Tosafix," we believe extensions should be easy to use, beneficial, and perfectly tailored to users\' needs. Therefore, every extension we develop provides a real solution to common problems, to make your work faster and more convenient.',
    userFocused: 'User-Focused',
    userFocusedDesc: 'Extensions built according to the real needs of users',
    timeSaving: 'Time-Saving',
    timeSavingDesc: 'Tools that streamline daily tasks and save precious time',
    secureReliable: 'Secure & Reliable',
    secureReliableDesc: 'Safe extensions with full protection of user privacy',
    easyToUse: 'Easy to Use',
    easyToUseDesc: 'A simple and intuitive interface that anyone can use',
    activeExtensions: 'Active Extensions',

    // Extensions Grid
    ourExtensions: 'Our Extensions',
    ourExtensionsDesc: 'Discover our collection of smart extensions, each specializing in solving a specific problem',
    readMore: 'Read More',

    // Grid Descriptions
    notiForumGridName: 'Noti',
    notiForumGridDesc: 'A forum notification tracking extension – saves time by centralizing notifications from various forums, so you don\'t have to check each one separately.',
    yaminaGridDesc: 'An extension for aligning LTR pages to RTL – automatically makes English pages readable and convenient for Hebrew speakers.',
    netSkinGridDesc: 'NetSkin replaces NetFree\'s standard block page with dozens of stunning, dynamic, and fully customizable designs.',
    hebrewDateGridDesc: 'Displays the Hebrew date in a tooltip when hovering over a Gregorian date.',
    myEmojiGridDesc: 'Upload, manage, search, and add your own custom emojis to chats, emails, social media, and more. Includes an advanced background removal option!',
    edgeOpenerGridDesc: 'Opens the current tab in Microsoft Edge or copies the URL.',

    // Cutfix Tool
    cutfix: 'Fix remover',
    cutfixDescription: 'Smart background remover and automatic transparent edge trimming.',
    cutfixPageTitle: 'Fix remover - Smart Background Remover',
    cutfixPageSubtitle: 'Upload an image, and the magic will happen. Background removal and transparent edge trimming - automatically.',
    selectImage: 'Select Image',
    supportedFiles: 'PNG, JPG, WEBP files are supported',
    removeBgAndTrim: 'Remove Background & Trim',
    trimOnly: 'Trim Transparent Edges Only',
    removeBgAndTrimDesc: 'AI-powered background removal and smart trimming.',
    trimOnlyDesc: 'Crop transparent edges from an existing PNG file.',
    processingImage: 'Processing the image, please wait...',
    trimmingEdges: 'Trimming transparent edges...',
    originalImage: 'Original Image',
    processedImage: 'Processed Image',
    downloadImage: 'Download Image',
    uploadAnotherImage: 'Upload Another Image',
    unsupportedFileType: 'Unsupported file type. Please select a PNG, JPG, or WEBP file.',
    fileTooLarge: (size: number) => `The file is too large. The maximum size is ${size}MB.`,
    serverError: (status: number, text: string) => `Server error (${status}): ${text}`,
    processingError: 'Oops, something went wrong. Please try again later.',

    // Live Music Tool
    liveMusic: 'Live Music',
    liveMusicDescription: 'Listen to live Jewish music radio stations.',
    kolChaiMusic: 'Kol Chai Music',
    kolPlay: 'Kol Play',
    tokerFm: 'Toker FM',
    jewishRadioNetwork: 'Jewish Radio Network',
    jewishMusicStream: 'Jewish Music Stream',
    nowPlaying: 'Now Playing',

    // Developers Page
    devIntro: 'Welcome to the Tosafix Developer Center. Here you will find documentation for various APIs and tools we offer.',
    cutfixApiTitle: 'Fix remover - Background Removal API',
    cutfixApiDesc: 'A simple and convenient API for programmatically removing backgrounds from images. Perfect for integration into applications, websites, or personal scripts.',
    endpoint: 'Endpoint',
    method: 'Method',
    body: 'Request Body',
    bodyDesc: `The request must be of type 'multipart/form-data' and contain a single field:`,
    fieldName: 'Field Name',
    file: 'file',
    fieldDesc: 'The image file you want to process.',
    supportedFormats: 'Supported Formats',
    fileSizeLimit: 'File Size Limit',
    successResponse: 'Success Response',
    successResponseDesc: 'When the processing is successful, the API will return:',
    statusCode: 'Status Code',
    contentType: 'Content-Type',
    responseBody: 'Response Body',
    responseBodyDesc: 'The binary data of the processed image file in PNG format.',
    errorResponse: 'Error Responses',
    error400: 'Bad Request (e.g., unsupported file type or missing file).',
    error500: 'Internal Server Error during image processing.',
    codeExamples: 'Code Examples',
    jsExample: 'JavaScript Example (Fetch API)',
    curlExample: 'cURL Example',
    templeTimerTitle: 'Temple Timer Widget',
    templeTimerDesc: 'A simple widget that displays a dynamic timer counting the time elapsed since the destruction of the Second Temple, available in Hebrew and English, and easy to embed.',
    livePreview: 'Live Preview',
    embedCode: 'Embed Code',
    embedInstructions: 'We offer two ways to embed the timer on your site. The automatic method is recommended for the best user experience.',
    customization: 'Customization',
    customizationDesc: 'You can change the size of the timer widget by modifying the `width` and `height` values in the iframe code to perfectly match your site\'s design.',
    credits: 'Credits',
    creditsDesc_part1: 'The timer uses the ',
    creditsDesc_link: 'SecondTempleTimerLibrary',
    creditsDesc_part2: ' JavaScript library for time calculation.',
    viewOnGitHub: 'View on GitHub',
    liveDemos: 'Live Demos',
    liveDemoHe: 'Link to Hebrew Version',
    liveDemoEn: 'Link to English Version',
    embedAutoTitle: '1. Automatic Embedding (Recommended)',
    embedAutoStep1: 'Step 1: Paste the following `<div>` where you want the timer to appear:',
    embedAutoStep2: 'Step 2: Paste the following `<script>` tag just before the closing `</body>` tag:',
    embedManualTitle: '2. Manual Embedding (Single Version)',
    embedManualDesc: 'If you prefer to set a specific version to always be displayed, use one of the following codes.',
    embedManualHe: 'Hebrew Version',
    embedManualEn: 'English Version',
    license: 'License',
    licenseDesc: 'This project is distributed under the MIT License.',

    // Extension Names & Descriptions
    notiForumName: 'NotiForum',
    notiForumDesc: 'An advanced Chrome extension for NodeBB and XenForo based forums, providing real-time notifications directly to your browser.',
    yaminaName: 'Yamina',
    yaminaDesc: '"Yamina" is a smart browser extension designed to improve the Hebrew reading experience online. It automatically changes page direction to RTL (right-to-left) on pages not set up that way, respecting user preferences. With a convenient interface and advanced features, "Yamina" lets you customize your browsing experience easily and efficiently.',
    netSkinName: 'NetSkin',
    netSkinDesc: 'Turn every block into a visual experience! NetSkin replaces NetFree\'s gray, standard block page with a whole world of stunning and dynamic designs. Instead of a standard page, enjoy dozens of designs customized to the type of block, whether it\'s a blocked site, a file under review, or a site in development. The extension even smartly detects why a site was blocked by a personal tag and displays its name! With advanced customization options, full control, and a choice between random or fixed modes, safe browsing has never looked better.',
    hebrewDateName: 'Hebrew Date Viewer',
    hebrewDateDesc: 'Have you ever browsed the web, came across an important Gregorian date – in an article, calendar, forum, or social media – and wondered what the exact Hebrew date is? The \'Hebrew Date converter\' extension is designed to meet this exact need! It serves as a personal and accessible date converter, allowing you to see the corresponding Hebrew date with a simple hover, without leaving the page or using external tools. Make your browsing experience more efficient and informative with this instant conversion.',
    myEmojiName: 'My Emoji',
    myEmojiDesc: "Make your digital communication more personal and creative with 'My emoji'! This Chrome extension lets you break the routine of familiar emojis and create your own private collection, based on your favorite images and SVG files. Easily upload your own PNG, JPG, GIF, WEBP, and SVG files and manage them in a convenient and user-friendly Hebrew interface. With the click of a button, copy your chosen emoji directly to your clipboard, ready to paste into chats, emails, social media, documents, and anywhere else you want to add a unique touch. With options for searching, sorting, editing names, setting a preferred size, backup via export/import, and even advanced background removal (using an external API of your choice), 'My emoji' gives you all the tools to create and use the perfect emoji collection for you. All your emojis are stored securely and locally on your computer, fully preserving your privacy. Install now and start expressing yourself in a new and exciting way!",
    edgeOpenerName: 'Edge Opener',
    edgeOpenerDesc: "Quickly switch from Chrome to Edge! Open the current page in Microsoft Edge with a single click. Includes automatic copying to the clipboard if direct opening fails.",

    // Contact Page
    contactTitle: 'Contact Us',
    contactSubtitle: "Have a question, comment, or idea? We'd love to hear from you!",
    contactFormTitle: "Send us a message",
    contactFormSubtitle: "We will reply as soon as possible",
    nameLabel: 'Full Name',
    phoneLabel: 'Phone (Optional)',
    emailLabel: 'Email Address',
    messageLabel: 'Message',
    namePlaceholder: "Enter your full name",
    phonePlaceholder: "Your phone number",
    emailPlaceholder: "your.email@example.com",
    messagePlaceholder: "Write your message here...",
    submitButton: 'Send Message',
    submittingButton: 'Sending...',
    successMessage: 'Message sent successfully!',
    errorMessage: 'An error occurred. Please try again later.',
    contactInfo: 'Contact Information',

    // Extension Layout
    heroTagline: 'Chrome Extension',
    keyFeatures: 'Key Features',
    installation: 'Installation',
    privacyPolicy: 'Privacy Policy',
    chromeWebStore: 'Chrome Web Store',
    supportedForums: 'Supported Forums',
    notiInstallDesc: 'Download from the Chrome Web Store.',
    copy: 'Copy',
    copied: 'Copied!',
    copyError: 'Error',
    download: 'Download',
    copyPolicyTooltip: 'Copy policy',
    downloadPolicyTooltip: 'Download policy as a .txt file.',

    // NotiForum Page (New design)
    notiPageTitle: 'NotiForum',
    notiPageSubtitle: 'All your forums. One inbox.',
    notiPageDescription: 'NotiForum is the perfect solution designed to save you time and centralize all your notifications and private messages in one accessible and stylish place, directly from your browser.',
    notiFeaturesSectionTitle: 'Features',
    notiFeaturesSectionSubtitle: 'Everything you need to stay updated, effortlessly',
    notiFeatureUnifiedInboxTitle: 'Unified Inbox',
    notiFeatureUnifiedInboxDesc: 'Get all your notifications and private messages from all your forums in one organized feed. Finally, no more jumping between tabs!',
    notiFeatureCustomizationTitle: 'Full Customization',
    notiFeatureCustomizationDesc: 'Choose from stunning themes, switch to dark mode, set a unique sound for each forum, or even upload your own sound files!',
    notiFeatureFlexibleUITitle: 'Flexible UI: Popup or Sidebar',
    notiFeatureFlexibleUIDesc: 'Choose to display the extension in a classic popup window, or pin it to the browser sidebar for quick and easy access that always works.',
    notiFeatureWideSupportTitle: 'Wide Support & Easy Addition',
    notiFeatureWideSupportDesc: 'The extension comes with a pre-made list of forums, and allows you to easily add any NodeBB or XenForo-based forum. It will even detect the forum type automatically!',
    notiFeaturePerformanceTitle: 'Efficiency and Performance',
    notiFeaturePerformanceDesc: 'With a fast background check mechanism and low resource consumption, NotiForum keeps you updated without slowing down your browsing experience.',
    notiFeaturePrivacyTitle: 'Privacy Above All',
    notiFeaturePrivacyDesc: 'All your information, including settings and uploaded files, is stored entirely locally on your computer. No data is sent to external servers.',
    notiSupportSectionTitle: 'Broad Support and Full Flexibility',
    notiSupportSectionSubtitle: 'From the default list to any forum you add yourself',
    andMore: 'And more...',
    notiInstallSectionTitle: 'Installation',
    notiInstallSectionDesc: 'To install from the Chrome Web Store',
    notiPrivacySectionTitle: 'Privacy Policy',

    // MyEmoji Features
    myEmojiFeature1Title: 'Personal Upload & Management',
    myEmojiFeature1Desc: 'Easily upload your own PNG, JPG, GIF, WEBP, and SVG files and manage them in one place.',
    myEmojiFeature2Title: 'Custom Size',
    myEmojiFeature2Desc: 'Choose the exact size (in pixels) at which the emoji will be copied to the clipboard, including a custom size option.',
    myEmojiFeature3Title: 'Advanced Search & Sort',
    myEmojiFeature3Desc: 'Easily find the desired emoji using text search and sort your collection by name or date added.',
    myEmojiFeature4Title: 'Quick Access to Recents',
    myEmojiFeature4Desc: 'The emojis you\'ve recently used appear at the top of the popup for immediate and convenient access.',
    myEmojiFeature5Title: 'Easy Import & Export',
    myEmojiFeature5Desc: 'Back up your entire emoji collection to a simple Zip file, and easily import it to another computer or after a reinstall.',
    myEmojiFeature6Title: 'One-Click Background Removal',
    myEmojiFeature6Desc: 'Connect your remove.bg account (requires user API Key) and remove backgrounds from images with one click to create clean emojis. (Optional)',
    myEmojiBonusSectionTitle: 'Bonus Files',
    myEmojiBonusCardTitle: 'Haredi Emojis',
    myEmojiBonusCardDesc: 'Download a bonus file containing Haredi emojis in a zip file for import into the extension.',
    myEmojiBonusCardCredit: 'Credit: The emojis were created by users of the Prog forum.',
    myEmojiBonusDownloadBtn: 'Download Haredi Emojis',

    // HebrewDate Features
    hebrewDateFeature1Title: 'Automatic Conversion on Hover',
    hebrewDateFeature1Desc: 'Simply hover your mouse over a supported Gregorian date and wait about half a second. A small tooltip will automatically appear near the cursor with the full Hebrew date.',
    hebrewDateFeature2Title: 'Accurate Conversion',
    hebrewDateFeature2Desc: 'The extension uses reliable algorithms (based on the Hebcal library) to ensure the displayed Hebrew date is the most correct and accurate, including consideration of leap years.',
    hebrewDateFeature3Title: 'Full Hebrew Date',
    hebrewDateFeature3Desc: 'The extension displays the full Hebrew date in the familiar and readable format: day of the month (in Gematria letters), Hebrew month name, and Hebrew year.',
    hebrewDateFeature4Title: 'Convenience and Speed',
    hebrewDateFeature4Desc: 'Save precious time! No need to copy dates, open external sites, or use calculators. The conversion happens instantly on the page you are on.',
    hebrewDateFeature5Title: 'Smooth and Clean Experience',
    hebrewDateFeature5Desc: 'The slight delay before the tooltip appears prevents it from "jumping" unnecessarily. It is positioned close to the mouse cursor and is designed not to interfere with or hide important content.',
    hebrewDateFeature6Title: 'Support for Common Standards',
    hebrewDateFeature6Desc: 'To ensure reliable detection, the extension focuses on dates clearly marked in the website\'s HTML code (datetime or data-numeric-value attribute).',

    // NetSkin Features
    netSkinGalleryTitle: "Design Gallery",
    netSkinGalleryDesc: "Some of the designs available in the extension",
    netSkinFeature1Title: 'Rich Design Gallery',
    netSkinFeature1Desc: 'Choose from over 60 unique designs, divided into smart categories by block type (blocked, in development, site check, files, and tags).',
    netSkinFeature2Title: 'Smart Tag Detection',
    netSkinFeature2Desc: 'For the first time, know exactly why a site was blocked! NetSkin detects the personal tag that caused the block and displays its full name, straight from NetFree\'s servers.',
    netSkinFeature3Title: 'Full Control & Customization',
    netSkinFeature3Desc: 'Choose how designs are displayed: in random mode, scheduled random (daily/hourly change), or by specifically selecting your favorite design for each category.',
    netSkinFeature4Title: 'Personal Design Pool',
    netSkinFeature4Desc: 'Like only some of the designs? Mark which designs will be included in the random modes, and create your own private, customized gallery.',
    netSkinFeature5Title: "Contextual Adaptation",
    netSkinFeature5Desc: "The extension identifies the reason for the block and allows you to set a different design style for each scenario, whether it's a file check or a site in development.",
    netSkinFeature6Title: "Advanced User Experience",
    netSkinFeature6Desc: "A convenient and intuitive settings interface, full support for Dark Mode, and the ability to preview any design with the click of a button.",

    // Yamina Features
    yaminaHowItWorksTitle: 'How It Works',
    yaminaHowItWorksDesc: 'Demonstration of aligning a page from left-to-right (before) and right-to-left (after)',
    yaminaFeature1Title: 'Automatic RTL Alignment',
    yaminaFeature1Desc: 'Changes the page direction to right-to-left on non-RTL pages, while ignoring pages already set to RTL.',
    yaminaFeature2Title: 'Alignment Mode Selection',
    yaminaFeature2Desc: 'Allows choosing between full alignment (including elements) and text-only alignment, to preserve the original page structure.',
    yaminaFeature3Title: 'Custom Blacklist',
    yaminaFeature3Desc: 'You can add specific sites or pages to a blacklist where the extension will not operate, via the settings page or context menu.',
    yaminaFeature4Title: 'Convenient Context Menu',
    yaminaFeature4Desc: 'A right-click on the extension icon allows for quick addition or removal of sites and pages from the blacklist.',
    yaminaFeature5Title: 'User-Friendly Interface',
    yaminaFeature5Desc: 'A well-designed and simple-to-use settings page with full customization options.',
    yaminaFeature6Title: 'Privacy Guaranteed',
    yaminaFeature6Desc: 'The extension operates locally, saves data only on your device, and does not share information with third parties.',

    // EdgeOpener Features
    edgeOpenerHowItWorksTitle: 'How It Works',
    edgeOpenerHowItWorksDesc: 'Easy and fast transition from Chrome to Edge in one click',
    edgeOpenerFeature1Title: "Instant Open in Edge",
    edgeOpenerFeature1Desc: 'With a single click, the extension attempts to open the current tab\'s URL directly in Microsoft Edge using the dedicated protocol (microsoft-edge:).',
    edgeOpenerFeature2Title: "Smart Backup: Copy to Clipboard",
    edgeOpenerFeature2Desc: 'If automatic opening in Edge is not possible (e.g., the protocol is not configured on the system), the full URL of the current page will be automatically copied to your clipboard.',
    edgeOpenerFeature3Title: 'Compatibility with Standard Web Pages',
    edgeOpenerFeature3Desc: 'The extension is designed to work on regular web addresses starting with http: or https:. It recognizes when it\'s an internal browser address (like chrome://extensions) and notifies that it cannot operate.',

    // Privacy Policies
    notiForumPrivacyPolicy: `Privacy Policy for "NotiForum" Extension
Last Updated: October 26, 2025

We, the developers of "NotiForum" (hereinafter: "the Extension"), are committed to protecting the privacy of our users. This privacy policy explains how we collect, use, store, and protect your information when you use the Extension, which is designed to centralize, display, and manage notifications from NodeBB and XenForo based forums.

Use of the Extension constitutes acceptance of this policy. Our guiding principle is simple: all your information remains entirely local on your computer. We never collect or transfer personal information to external servers.

1. Information We Collect

The Extension collects and stores the following types of information, but only in your local browser:

1.1. User Settings:

List of forums to track: The addresses and names of the forums you have added, whether from the default list or manually.
Operational preferences: Notification check frequency, sound settings (including volume and sound choice for each forum), and browser notification preferences.
Appearance preferences: The selected theme, display mode (light/dark/auto), and display method (popup/sidebar).
This information is saved using chrome.storage.sync to synchronize your settings between devices connected to the same Google account.

1.2. User-Uploaded Content:

Custom icons: Image files you have uploaded to represent forums you have added.
Custom sounds: Audio files you have uploaded to be used as notification sounds.
This content is saved as text (in Data URL format) using chrome.storage.local and remains exclusively on your device. We do not have access to these files and they are never sent from your computer.

1.3. Notification and Connection Data:

Notification content: Text, links, and dates of new notifications and private messages. This information is retrieved directly from the forums you have configured.
Connection status: The Extension temporarily saves the connection status for each forum (whether the connection succeeded or failed) and the latest notification content.
This information is temporarily saved in chrome.storage.local to manage the display of notifications and detect changes.

1.4. Authentication Cookies:

The Extension accesses cookies belonging to the domains of the forums you have configured. This access is essential to make authenticated requests on your behalf and receive relevant notifications.
The Extension does not collect, save, or transfer your cookies. It uses them locally only as the browser allows.

2. How We Use Information

The collected information is used solely for the following purposes:

Full operation of the Extension: Fetching notifications, displaying them in the interface, playing sounds, and showing browser notifications according to your chosen settings.
Personalization of the experience: Saving your appearance and behavior preferences to provide a consistent experience.
Use of your uploaded content: Displaying the icons you uploaded in the interface, and playing the audio files you uploaded when a notification is received.
We do not use your information for advertising, statistical analysis, tracking, or any other activity not directly related to the core functionality of the Extension.

3. Sharing Information with Third Parties

We do not share your information with any third party. The only communication that takes place is directly from your browser to the servers of the forums you have configured for tracking.

4. Data Storage and Security

All information is stored locally on your computer using Google Chrome's secure mechanisms (chrome.storage).
Synchronized settings (chrome.storage.sync) are protected by your Google account's security mechanisms.
Local information (chrome.storage.local), such as uploaded files and notification status, is accessible only on the specific device you are using.

5. User Rights

Full control: You can edit, add, or delete the list of forums, settings, and files you have uploaded at any time through the Extension's settings page.
Complete removal: Uninstalling the Extension from the browser will immediately and completely delete all information the Extension has saved.

6. Changes to the Privacy Policy

We may update this policy in the future to reflect changes in the Extension or Chrome Web Store requirements. Any changes will be published in an updated version of the Extension.

7. Contact Us

For questions or clarifications regarding this policy, you are welcome to contact us through the Extension's website.

Thank you for choosing NotiForum.`,
    yaminaPrivacyPolicy: `Last Updated: March 26, 2025

The Yamina extension ("we," "us") is designed to automatically change the directionality of web pages to RTL (right-to-left) to improve the Hebrew reading experience. This Privacy Policy explains how we handle user data, ensuring transparency and compliance with privacy standards.

1. Data We Collect
The Yamina extension collects the following data:
- Website URLs: When you add a site or page to the blacklist (via the context menu or settings page), the URL of the active tab is stored locally on your device using chrome.storage.local. This is necessary to determine whether the extension should align the directionality to RTL for specific sites or pages.

2. How We Use Your Data
The collected URLs are used solely to manage the blacklist feature, which allows you to control on which sites or pages the extension will not change their directionality. The data is stored locally on your device and is not transmitted to external servers or third parties.

3. Data Storage and Security
All data collected by the extension (i.e., blacklisted URLs) is stored locally on your device using chrome.storage.local. We do not have access to this data, and it is not sent to external servers. The data remains on your device and can be managed or deleted by you through the extension's settings page.

4. Data Sharing
We do not share, sell, or disclose any data collected by the extension with third parties. The extension operates entirely locally within your browser.

5. Permissions and Access
The extension uses the following permissions:
- "tabs": To access the URL of the active tab for managing the blacklist and context menu updates.
- "content_scripts" with "<all_urls>": To align the directionality to RTL on non-RTL pages, while respecting the blacklist.
- "storage": To save your settings, such as the blacklist and alignment mode (full/text-only).
- "contextMenus": To provide a context menu for adding/removing sites from the blacklist.
These permissions are used exclusively to provide the core functionality of the extension and are not used for collecting or tracking user data beyond what is necessary for the blacklist feature.

6. User Control
You have full control over the data stored by the extension. You can view, edit, or remove URLs from the blacklist at any time through the extension's settings page.

7. Changes to This Privacy Policy
We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated "Last Updated" date. We encourage you to review this policy periodically.

8. Contact Us
If you have any questions or concerns about this Privacy Policy or the extension's data practices, please contact us on the website.

This Privacy Policy is provided to ensure transparency about how the Yamina extension handles user data. We are committed to protecting your privacy and providing a safe and useful experience.`,
    netSkinPrivacyPolicy: `Last Updated: August 22, 2025

This Privacy Policy describes how the NetSkin browser extension ("the Extension") handles information. Your privacy is our top priority, and this policy is designed to provide you with full transparency about the Extension's operation. We are committed to minimizing information access to the minimum necessary for the Extension's proper functioning.

1. What information do we process?
The NetSkin Extension was designed from the ground up with privacy in mind. We do not collect, store, or transmit any personally identifiable information (PII) such as your name, email address, or your general browsing history. The only information the Extension handles is of two types:

User Settings: All settings you choose for the Extension (such as preferred design, operating mode, enabling/disabling categories) are stored locally on your computer using the chrome.storage.sync mechanism. This information is synchronized with your Google account to maintain consistency between devices but is not sent to or accessible by us in any way.
Anonymous Tag Information (for display purposes only): One of the key features of the Extension is the ability to display the name of the personal tag that caused a site to be blocked. To achieve this, and only when a page is blocked due to a personal tag you have set in NetFree, the Extension performs the following actions:
- The Extension identifies the tag's identifier (an anonymous numeric code) from the information provided by NetFree on the block page.
- The Extension sends only this numeric identifier to NetFree's official API server (at https://netfree.link/api/tags/get-names).
- The NetFree server responds with the literal name of the tag (e.g., "News").
- The Extension displays this name to you on the styled block page.

It is important to emphasize:
- The information sent (the tag identifier) is anonymous and not linked to your account or identity.
- The information is not stored by the Extension after receiving the tag name.
- The operation is performed securely with NetFree's official server, for this purpose only.

2. Explanation of Extension Permissions
During installation, the Extension requests the following permissions:

"Access your data on all websites" (<all_urls>): We understand that this permission sounds broad, so it is important for us to explain why it is necessary. NetFree's block page can appear at any web address you try to browse. This permission is required solely to allow the Extension to detect the existence of NetFree's block page on the page you are on.
We pledge that the Extension does not read, collect, store, modify, or transmit the content of any other site you browse. Its operation is strictly limited to identifying and replacing the specific NetFree block page.
storage: This permission is required to save your personal settings (as explained in section 1).
alarms: This permission is used to schedule the random design change in "scheduled random" mode, according to your settings (e.g., once a day).

3. Third-Party Services
NetFree API: As mentioned, the Extension communicates with NetFree's official API to get tag names.
Image Servers: Some of the background images used in the various designs are hosted on external servers (such as lovepik.com, stockcake.com, etc.). Loading these images is a standard browser action, similar to loading images on any website.

4. Policy Changes
We may update this policy from time to time. Any material changes will be published on the Extension's page in the Chrome Web Store.

5. Contact Us
If you have any questions about this privacy policy, please contact us through the Extension's website.

We thank you for using NetSkin!`,
    hebrewDatePrivacyPolicy: `Privacy Policy - Hebrew Date Viewer
Last Updated: October 26, 2025

The "Hebrew Date Viewer" extension (hereinafter: "the Extension") was created with one purpose: to show you the Hebrew date corresponding to a Gregorian date that appears on web pages. Your privacy is very important to us, so the Extension was designed to be as simple and safe as possible.

1. Information Collection
The Extension does not collect, store, transmit, or share any personal information or browsing data. Its operation is performed entirely and locally in your browser.
The Extension does not require special permissions beyond the ability to read the content of the current page to identify dates.

2. Use of Information
The Extension reads the page content temporarily to locate Gregorian dates. This information is processed immediately for conversion to a Hebrew date and is not stored anywhere after the page is closed.

3. Third Parties
The Extension does not communicate with any external servers or third-party services. All date calculations are performed locally.

4. Policy Changes
Any changes to this privacy policy will be updated in the extension's description in the Chrome Web Store.

Thank you for using the extension!`,
    myEmojiPrivacyPolicy: `Privacy Policy - My Emoji
Last Updated: October 26, 2025

We, the developers of "My Emoji" (hereinafter: "the Extension"), are committed to protecting the privacy of our users. This policy explains how we handle your information. Our guiding principle is that all your information is yours alone and stays on your computer.

1. Information Collection and Storage
The Extension allows you to upload and manage image files (emojis). All the files you upload, along with your settings (such as emoji names, preferred size, and sort order), are stored securely and locally on your computer using the chrome.storage.local mechanism.
We never access, collect, transfer, or share your emojis or settings with any external servers or third parties.

2. Backup and Restore (Export/Import)
The Extension offers an option to export your emoji collection to a Zip file. This action is initiated by you only, and the file is saved to a location of your choice on your computer. The import process is similar and allows you to restore your collection from a local backup file.

3. Integration with Third-Party Services (Optional)
The Extension offers an optional integration with the remove.bg background removal service.
- To use this feature, you must manually enter your personal API Key from your remove.bg account.
- The API Key is stored securely and locally on your computer.
- When you choose to remove a background from an image, the Extension sends the image directly to remove.bg's servers for processing, in accordance with their terms of service and privacy policy. We do not send any additional information.
- The use of this feature is at your own risk. If you do not enter an API Key, the Extension will not communicate with this service.

4. Permissions
The Extension requires the "storage" permission to save your information locally, and the "clipboardWrite" permission to allow you to copy emojis to the clipboard.

5. Uninstalling the Extension
Uninstalling the Extension from the browser will permanently delete all the emojis and settings you have saved.

Thank you for using "My Emoji"!`,
    edgeOpenerPrivacyPolicy: `Privacy Policy - Edge Opener
Last Updated: October 26, 2025

The "Edge Opener" extension (hereinafter: "the Extension") is designed to operate with simplicity and full transparency. Your privacy is important to us, and this policy explains its operation.

1. Information Collection
The Extension does not collect, store, or transmit any personal information or browsing data.

2. Extension Operation
When you click on the extension icon, it performs only two actions:
a. Reads the URL of the current active tab.
b. Attempts to open that URL in the Microsoft Edge browser using the "microsoft-edge:" protocol.
c. If the opening fails, the Extension copies the URL to your clipboard.
The URL information is used immediately for these actions only and is not saved or sent anywhere.

3. Permissions
The Extension requires the following permissions:
- "tabs": To read the URL of the active tab.
- "clipboardWrite": To copy the URL to the clipboard if needed.

The Extension does not communicate with external servers. All operations are performed entirely locally.

Thank you for using "Edge Opener"!`,
  }
};