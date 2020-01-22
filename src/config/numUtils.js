/* 计算浮点型数字的方法、排除浮点运算误差 */
/* 在需要运算的页面里引用一下 */

        /*
        函数，加法函数，用来得到精确的加法结果
        说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
        参数：numMap：要计算的数组['24.79', '0.72', 1.77]；d：保留默认小数，默认2位。
        调用：Calc.Add(numMap, d)
        返回值：多数相加的结果
        */
        const Add = (numMap, d) => {
            d = d ? d : 2;
            var allMap = [], maxLen = 0, pow = 0;
            for (var i = 0; i < numMap.length; i++) {
                if (Object.prototype.toString.call(allMap[i]) !== '[object Object]') {
                    allMap[i] = {
                        num: '',
                        numArr: '',
                        d1: '',
                    }
                }
                allMap[i].num = numMap[i].toString();
                allMap[i].numArr = allMap[i].num.split(".");
                allMap[i].d1 = allMap[i].numArr.length == 2 ? allMap[i].numArr[1] : "";
            }
            for (var i = 0; i < allMap.length; i++) {
                maxLen = maxLen.length > allMap[i].d1.length ? maxLen : allMap[i].d1;
            }
            maxLen = maxLen.length;
            pow = Math.pow(10, maxLen);
            var resNum = 0;
            for (var i = 0; i < allMap.length; i++) {
                resNum += allMap[i].num * pow;
            }
            var result = Number((resNum / pow).toFixed(maxLen));
            var d = arguments[d];
            return typeof d === "number" ? Number((result).toFixed(d)) : result;
        }
        /*
           函数：减法函数，用来得到精确的减法结果
           说明：函数返回较为精确的减法结果。
           参数：numMap：要计算的数组['24.79', '0.72', 1.77]；d：保留默认小数，默认2位。
           调用：Calc.Sub(numMap, d)
           返回值：两数相减的结果
        */
        const Sub = (numMap, d) => {
            var addMap = [];
            for (var i = 0; i < numMap.length; i++) {
                addMap[i] = numMap[i];
                if (i > 0) {
                    addMap[i] = -Number(numMap[i]);
                }
            }
            return Calc.Add(addMap, d);
        }

        /*
        函数：乘法函数，用来得到精确的乘法结果
        说明：函数返回较为精确的乘法结果。
        参数：arg1：第一个乘数；arg2第二个乘数；d要保留的小数位数（可以不传此参数，如果不传则不处理小数位数)
        调用：Calc.Mul(arg1,arg2)
        返回值：两数相乘的结果
        */
        const Mul = (numMap, d) => {
            d = d ? d : 2;
            var resultVal, all = 0, dv = 0;
            for (var i = 0; i < numMap.length; i++) {
                let strNum = numMap[i].toString();
                dv += (strNum.split(".")[1] ? strNum.split(".")[1].length : 0)
                if (all === 0) {
                    all = Number(strNum.replace(".", ""));
                } else {
                    all *= Number(strNum.replace(".", ""));
                }
            }
            resultVal = all / Math.pow(10, dv);
            // Number(resultVal.toFixed(parseInt(d))
            return typeof d !== "number" ? Number(resultVal) : Number(resultVal.toFixed(parseInt(d)));
        }
        /*
        函数：除法函数，用来得到精确的除法结果
        说明：函数返回较为精确的除法结果。
        参数：arg1：除数；arg2被除数；d要保留的小数位数（可以不传此参数，如果不传则不处理小数位数)
        调用：Calc.Div(arg1,arg2)
        返回值：arg1除于arg2的结果
        */
        const Div = (numMap, d) => {
            d = d ? d : 2;
            var resultVal, all = 0, dv = 0;
            var sort = numMap.length;
            for (var i = 0; i < numMap.length; i++) {
                sort--;
                let strNum = numMap[i].toString();
                let sortStrNum = numMap[sort].toString();
                if (i === 0) {
                    dv = (sortStrNum.split(".")[1] ? sortStrNum.split(".")[1].length : 0);
                    all = Number(strNum.replace(".", ""));
                } else {
                    dv -= (sortStrNum.split(".")[1] ? sortStrNum.split(".")[1].length : 0);
                    all = all / Number(strNum.replace(".", ""));
                }
            }
            console.log(all, dv);
            resultVal = all * Math.pow(10, dv);
            return typeof d !== "number" ? Number(resultVal) : Number(resultVal.toFixed(parseInt(d)));
        }

        export {
            Add, Sub, Mul, Div
        }
