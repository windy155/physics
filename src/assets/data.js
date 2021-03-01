import Mock from "./mock.js";

export function mockMain(){
    Mock.mock('findMain.json',{
        "status": "success",
        "msg": "查询成功",
        'data|10': [{
            "id|+1":1,
            "number|+1":100,
            "num": '@natural(10000000,99999999)',
            "produced":"@natural(0,30000)",
            "produce": "@natural(0,30000)",
            "perc":"@natural(95,99)"+'.'+"@natural(0,99)"+'%'
        }]
    });
    Mock.setup({
        timeout:0
    })
}

export function mockDetail(){
    Mock.mock('findDetail.json',{
        "status": "success",
        "msg": "查询成功",
        "data|10": [{
            'id|+1': 1,
            'num': '@natural(0,10)',
            'width': '@natural(100,500)'+'像素',
            'height': '@natural(100,500)'+'像素',
            'scale': '@float(0,0,5,5)',
            'shift': '@float(0,0,2,2)'+'mm',
            'degree': '@float(0,9,1,2)'+'°',
            'distence': '@float(2,2,2,2)'+'mm',
            'area': '@natural(200,300)'+'像素',
            'problem|1': ['OK','钉花少','钉偏'],
            'date': "@date(yyyy/MM/dd)",
            'time': "@time"
        }]
    })
    Mock.setup({
        timeout:0
    })
}
    

