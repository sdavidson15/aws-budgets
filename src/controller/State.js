var AppState = (function () {
    var BudgetName,
        BudgetAmount,
        BudgetHistory,
        CurrentSpend,
        ForecastedSpend,
        BudgetsListing,

        GetBudgetName = function () {
            return BudgetName;
        },

        GetBudgetAmount = function () {
            return BudgetAmount;
        },

        GetBudgetHistory = function () {
            return BudgetHistory.slice(0);
        },

        GetCurrentSpend = function () {
            return CurrentSpend;
        },

        GetForecastedSpend = function () {
            return ForecastedSpend;
        },

        GetBudgetsListing = function () {
            return BudgetsListing.slice(0);
        },

        init = function () {
            BudgetName = 'Monthly AWS Budget Alert io-example 012345678901';
            BudgetAmount = '$1,000';
            CurrentSpend = '$767.72\t(76.77% of budgeted)';
            ForecastedSpend = '$788.99\t(78.90% of budgeted)';

            function createBudgetHistoryData(id, date, actual, budgeted, variance, varianceDescr) {
                return { id, date, actual, budgeted, variance, varianceDescr };
            };

            BudgetHistory = [
                createBudgetHistoryData(0, 'Oct 2019 (MTD)', 0, 1000, 1000, '100% under budget'),
                createBudgetHistoryData(1, 'Sep 2019', 776.88, 1000, 223.12, '22.31% under budget'),
                createBudgetHistoryData(2, 'Aug 2019', 554.94, 1000, 445.06, '44.50% under budget'),
                createBudgetHistoryData(3, 'Jul 2019', 446.48, 1000, 553.52, '55.35% under budget'),
                createBudgetHistoryData(4, 'Jun 2019', 399.78, 1000, 600.22, '60.02% under budget'),
                createBudgetHistoryData(5, 'May 2019', 385.70, 1000, 614.30, '61.43% under budget'),
                createBudgetHistoryData(6, 'Apr 2019', 412.81, 1000, 587.19, '58.71% under budget'),
                createBudgetHistoryData(7, 'Mar 2019', 191.53, 1000, 808.47, '80.84% under budget'),
                createBudgetHistoryData(8, 'Feb 2019', 170.19, 1000, 829.81, '82.98% under budget'),
                createBudgetHistoryData(9, 'Jan 2019', 357.57, 1000, 642.43, '64.24% under budget'),
                createBudgetHistoryData(10, 'Dec 2018', 1275.56, 1000, -275.56, '27.55% over budget'),
                createBudgetHistoryData(11, 'Nov 2018', 1115.29, 1000, -115.29, '11.52% over budget'),
                createBudgetHistoryData(12, 'Oct 2018', 1341.69, 1000, -341.69, '34.16% over budget')
            ];

            function createBudgetsListingData(id, accountId, name, budgetAmount, spend) {
                return { id, accountId, name, budgetAmount, spend };
            };

            BudgetsListing = [
                createBudgetsListingData(0, "123400000017", "Monthly AWS Budget Alert (90 percent) io-agopod 123400000017", 10000, 9598.75),
                createBudgetsListingData(1, "125100000025", "Monthly AWS Budget Alert (100 percent) io-aitlox 125100000025", 1000, 1167.89),
                createBudgetsListingData(2, "127900000039", "Monthly AWS Budget Alert (100 percent) io-alkdew 127900000039", 1000, 956.82),
                createBudgetsListingData(3, "122400000012", "Monthly AWS Budget Alert (90 percent) io-avarob 122400000012", 500, 465.69),
                createBudgetsListingData(4, "129300000046", "Monthly AWS Budget Alert (100 percent) io-azobar 129300000046", 300, 305.3),
                createBudgetsListingData(5, "122500000012", "Monthly AWS Budget Alert (100 percent) io-bairig 122500000012", 10000, 5712.16),
                createBudgetsListingData(6, "128800000044", "Monthly AWS Budget Alert (90 percent) io-barbol 128800000044", 2000, 1827.23),
                createBudgetsListingData(7, "123500000017", "Monthly AWS Budget Alert (100 percent) io-bedpix 123500000017", 5000, 4826.72),
                createBudgetsListingData(8, "129400000047", "Monthly AWS Budget Alert (90 percent) io-binbar 129400000047", 800, 765.26),
                createBudgetsListingData(9, "128700000043", "Monthly AWS Budget Alert (100 percent) io-bmabrl 128700000043", 200, 158.56),
                createBudgetsListingData(10, "121700000008", "Monthly AWS Budget Alert (100 percent) io-boasep 121700000008", 4000, 4010.52),
                createBudgetsListingData(11, "126800000034", "Monthly AWS Budget Alert (90 percent) io-bolger 126800000034", 600, 618.98),
                createBudgetsListingData(12, "124000000020", "Monthly AWS Budget Alert (90 percent) io-brlolm 124000000020", 800, 764.71),
                createBudgetsListingData(13, "121100000005", "Monthly AWS Budget Alert (100 percent) io-byetod 121100000005", 700, 722.02),
                createBudgetsListingData(14, "122700000013", "Monthly AWS Budget Alert (100 percent) io-cosrch 122700000013", 700, 695.02),
                createBudgetsListingData(15, "126000000030", "Monthly AWS Budget Alert (90 percent) io-cuehkj 126000000030", 500, 458.65),
                createBudgetsListingData(16, "12300000001", "Monthly AWS Budget Alert (100 percent) io-dawxis 12300000001", 10000, 5890.35),
                createBudgetsListingData(17, "122600000013", "Monthly AWS Budget Alert (90 percent) io-ddrrfc 122600000013", 500, 528.94),
                createBudgetsListingData(18, "126300000031", "Monthly AWS Budget Alert (100 percent) io-dengur 126300000031", 500, 536.34),
                createBudgetsListingData(19, "124200000021", "Monthly AWS Budget Alert (90 percent) io-dernlc 124200000021", 400, 361.61),
                createBudgetsListingData(20, "122200000011", "Monthly AWS Budget Alert (90 percent) io-dewsac 122200000011", 200, 191.96),
                createBudgetsListingData(21, "128100000040", "Monthly AWS Budget Alert (100 percent) io-didden 128100000040", 10000, 6698.05),
                createBudgetsListingData(22, "124500000022", "Monthly AWS Budget Alert (100 percent) io-dstmst 124500000022", 10000, 9578.74),
                createBudgetsListingData(23, "121200000006", "Monthly AWS Budget Alert (90 percent) io-dwtteh 121200000006", 100, 97.81),
                createBudgetsListingData(24, "128500000042", "Monthly AWS Budget Alert (100 percent) io-ellcos 128500000042", 600, 645.47),
                createBudgetsListingData(25, "129900000049", "Monthly AWS Budget Alert (100 percent) io-esnait 129900000049", 500, 506.53),
                createBudgetsListingData(26, "121500000007", "Monthly AWS Budget Alert (100 percent) io-fldsld 121500000007", 400, 425.1),
                createBudgetsListingData(27, "124400000022", "Monthly AWS Budget Alert (90 percent) io-fpanan 124400000022", 1000, 970.13),
                createBudgetsListingData(28, "129100000045", "Monthly AWS Budget Alert (100 percent) io-frsbin 129100000045", 10000, 5340.37),
                createBudgetsListingData(29, "125800000029", "Monthly AWS Budget Alert (90 percent) io-fzsjat 125800000029", 10000, 6116.25),
                createBudgetsListingData(30, "124700000023", "Monthly AWS Budget Alert (100 percent) io-gaymee 124700000023", 10000, 9102.47),
                createBudgetsListingData(31, "124600000023", "Monthly AWS Budget Alert (90 percent) io-germia 124600000023", 10000, 9925.47),
                createBudgetsListingData(32, "125300000026", "Monthly AWS Budget Alert (100 percent) io-getlao 125300000026", 600, 647.14),
                createBudgetsListingData(33, "125200000026", "Monthly AWS Budget Alert (90 percent) io-glelit 125200000026", 900, 889.46),
                createBudgetsListingData(34, "129800000049", "Monthly AWS Budget Alert (90 percent) io-gpoalk 129800000049", 10000, 9230.16),
                createBudgetsListingData(35, "121400000007", "Monthly AWS Budget Alert (90 percent) io-gtdsub 121400000007", 900, 939.95),
                createBudgetsListingData(36, "12700000003", "Monthly AWS Budget Alert (100 percent) io-gurvie 12700000003", 800, 849.19),
                createBudgetsListingData(37, "128600000043", "Monthly AWS Budget Alert (90 percent) io-habbye 128600000043", 800, 821.19),
                createBudgetsListingData(38, "129700000048", "Monthly AWS Budget Alert (100 percent) io-hidava 129700000048", 10000, 5018.78),
                createBudgetsListingData(39, "126600000033", "Monthly AWS Budget Alert (90 percent) io-hkjgle 126600000033", 3000, 3359.93),
                createBudgetsListingData(40, "122300000011", "Monthly AWS Budget Alert (100 percent) io-iwwroc 122300000011", 2500, 2556.28),
                createBudgetsListingData(41, "125500000027", "Monthly AWS Budget Alert (100 percent) io-jatjut 125500000027", 200, 246.88),
                createBudgetsListingData(42, "127800000039", "Monthly AWS Budget Alert (90 percent) io-jigdid 127800000039", 400, 419.72),
                createBudgetsListingData(43, "125700000028", "Monthly AWS Budget Alert (100 percent) io-junjig 125700000028", 10000, 6953.77),
                createBudgetsListingData(44, "126200000031", "Monthly AWS Budget Alert (90 percent) io-juthab 126200000031", 900, 941.45),
                createBudgetsListingData(45, "128900000044", "Monthly AWS Budget Alert (100 percent) io-kegboa 128900000044", 600, 570.8),
                createBudgetsListingData(46, "126100000030", "Monthly AWS Budget Alert (100 percent) io-laohid 126100000030", 1000, 1078.71),
                createBudgetsListingData(47, "126400000032", "Monthly AWS Budget Alert (90 percent) io-litgtd 126400000032", 600, 587.06),
                createBudgetsListingData(48, "124100000020", "Monthly AWS Budget Alert (100 percent) io-loxoat 124100000020", 10000, 8799.26),
                createBudgetsListingData(49, "125600000028", "Monthly AWS Budget Alert (90 percent) io-lsijun 125600000028", 10000, 7475.31),
                createBudgetsListingData(50, "126700000033", "Monthly AWS Budget Alert (100 percent) io-lyeget 126700000033", 500, 522.83),
                createBudgetsListingData(51, "123100000015", "Monthly AWS Budget Alert (100 percent) io-marqqv 123100000015", 300, 334.69),
                createBudgetsListingData(52, "121300000006", "Monthly AWS Budget Alert (100 percent) io-meetao 121300000006", 800, 783.84),
                createBudgetsListingData(53, "121000000005", "Monthly AWS Budget Alert (90 percent) io-miault 121000000005", 2000, 2133.67),
                createBudgetsListingData(54, "12000000040", "Monthly AWS Budget Alert (90 percent) io-mstyod 12000000040", 700, 665.93),
                createBudgetsListingData(55, "127100000035", "Monthly AWS Budget Alert (100 percent) io-nanfrs 127100000035", 5000, 4206.91),
                createBudgetsListingData(56, "127500000037", "Monthly AWS Budget Alert (100 percent) io-nasell 127500000037", 5000, 3224.41),
                createBudgetsListingData(57, "121900000009", "Monthly AWS Budget Alert (100 percent) io-nlcsem 121900000009", 700, 731.27),
                createBudgetsListingData(58, "123600000018", "Monthly AWS Budget Alert (90 percent) io-oatpew 123600000018", 10000, 8912.11),
                createBudgetsListingData(59, "121600000008", "Monthly AWS Budget Alert (90 percent) io-olmshm 121600000008", 900, 910.5),
                createBudgetsListingData(60, "122100000010", "Monthly AWS Budget Alert (100 percent) io-orasay 122100000010", 10000, 7487.55),
                createBudgetsListingData(61, "12500000002", "Monthly AWS Budget Alert (100 percent) io-patwee 12500000002", 10000, 9246.65),
                createBudgetsListingData(62, "12200000001", "Monthly AWS Budget Alert (90 percent) io-pbxyes 12200000001", 400, 36.27),
                createBudgetsListingData(63, "126500000032", "Monthly AWS Budget Alert (100 percent) io-pewgpo 126500000032", 500, 463.21),
                createBudgetsListingData(64, "123200000016", "Monthly AWS Budget Alert (90 percent) io-pixpus 123200000016", 10000, 7726.78),
                createBudgetsListingData(65, "127400000037", "Monthly AWS Budget Alert (90 percent) io-podesn 127400000037", 700, 746.94),
                createBudgetsListingData(66, "12400000002", "Monthly AWS Budget Alert (90 percent) io-ppswlm 12400000002", 600, 599.22),
                createBudgetsListingData(67, "129600000048", "Monthly AWS Budget Alert (90 percent) io-pusazo 129600000048", 10000, 7451.83),
                createBudgetsListingData(68, "125000000025", "Monthly AWS Budget Alert (90 percent) io-qqvlsi 125000000025", 500, 489.95),
                createBudgetsListingData(69, "125900000029", "Monthly AWS Budget Alert (100 percent) io-quaiww 125900000029", 600, 605.69),
                createBudgetsListingData(70, "129500000047", "Monthly AWS Budget Alert (100 percent) io-racbai 129500000047", 1000, 84.12),
                createBudgetsListingData(71, "128000000040", "Monthly AWS Budget Alert (90 percent) io-ramder 128000000040", 300, 312.89),
                createBudgetsListingData(72, "128300000041", "Monthly AWS Budget Alert (100 percent) io-rchdaw 128300000041", 600, 648.59),
                createBudgetsListingData(73, "12800000004", "Monthly AWS Budget Alert (90 percent) io-rfcvdu 12800000004", 5000, 3333.21),
                createBudgetsListingData(74, "123900000019", "Monthly AWS Budget Alert (100 percent) io-rigora 123900000019", 500, 62.57),
                createBudgetsListingData(75, "12600000003", "Monthly AWS Budget Alert (90 percent) io-robwap 12600000003", 300, 281.52),
                createBudgetsListingData(76, "128200000041", "Monthly AWS Budget Alert (90 percent) io-rocddr 128200000041", 600, 631.7),
                createBudgetsListingData(77, "127000000035", "Monthly AWS Budget Alert (90 percent) io-sacfzs 127000000035", 500, 4452.07),
                createBudgetsListingData(78, "122000000010", "Monthly AWS Budget Alert (90 percent) io-saysce 122000000010", 1000, 984.98),
                createBudgetsListingData(79, "123300000016", "Monthly AWS Budget Alert (100 percent) io-scepps 123300000016", 300, 345.64),
                createBudgetsListingData(80, "122800000014", "Monthly AWS Budget Alert (90 percent) io-semram 122800000014", 800, 785.56),
                createBudgetsListingData(81, "124900000024", "Monthly AWS Budget Alert (100 percent) io-senlye 124900000024", 400, 377.01),
                createBudgetsListingData(82, "127600000038", "Monthly AWS Budget Alert (90 percent) io-sepdwt 127600000038", 5000, 4951.58),
                createBudgetsListingData(83, "127200000036", "Monthly AWS Budget Alert (90 percent) io-shmfpa 127200000036", 1000, 968.43),
                createBudgetsListingData(84, "127700000038", "Monthly AWS Budget Alert (100 percent) io-slddst 127700000038", 10000, 9718.56),
                createBudgetsListingData(85, "123700000018", "Monthly AWS Budget Alert (100 percent) io-subpbx 123700000018", 600, 642.4),
                createBudgetsListingData(86, "12900000004", "Monthly AWS Budget Alert (100 percent) io-taousw 12900000004", 2000, 2524.67),
                createBudgetsListingData(87, "129000000045", "Monthly AWS Budget Alert (90 percent) io-tehbma 129000000045", 800, 805.83),
                createBudgetsListingData(88, "122900000014", "Monthly AWS Budget Alert (100 percent) io-todrac 122900000014", 5000, 4730.65),
                createBudgetsListingData(89, "123800000019", "Monthly AWS Budget Alert (90 percent) io-ultpat 123800000019", 100, 102.7),
                createBudgetsListingData(90, "129200000046", "Monthly AWS Budget Alert (90 percent) io-uswbed 129200000046", 10000, 5151.34),
                createBudgetsListingData(91, "126900000034", "Monthly AWS Budget Alert (100 percent) io-vdugay 126900000034", 10000, 6819.58),
                createBudgetsListingData(92, "124300000021", "Monthly AWS Budget Alert (100 percent) io-vienas 124300000021", 600, 629.78),
                createBudgetsListingData(93, "123000000015", "Monthly AWS Budget Alert (90 percent) io-wapqua 123000000015", 800, 789.77),
                createBudgetsListingData(94, "128400000042", "Monthly AWS Budget Alert (90 percent) io-weecue 128400000042", 10000, 9888.26),
                createBudgetsListingData(95, "127300000036", "Monthly AWS Budget Alert (100 percent) io-wlmfld 127300000036", 10000, 6823.5),
                createBudgetsListingData(96, "121800000009", "Monthly AWS Budget Alert (90 percent) io-xissen 121800000009", 800, 838.98),
                createBudgetsListingData(97, "125400000027", "Monthly AWS Budget Alert (90 percent) io-yeskeg 125400000027", 1000, 973.61),
                createBudgetsListingData(98, "124800000024", "Monthly AWS Budget Alert (90 percent) io-yidmar 124800000024", 10000, 6943.06),
                createBudgetsListingData(99, "12100000040", "Monthly AWS Budget Alert (100 percent) io-yodyid 12100000040", 2000, 1812.94)
            ];
        };

    return {
        init: init,
        BudgetName: GetBudgetName,
        BudgetAmount: GetBudgetAmount,
        BudgetHistory: GetBudgetHistory,
        CurrentSpend: GetCurrentSpend,
        ForecastedSpend: GetForecastedSpend,
        BudgetsListing: GetBudgetsListing
    };
}());

export default AppState;