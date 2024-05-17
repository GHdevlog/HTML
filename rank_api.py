from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/data', methods=['GET'])
def get_data():
    data = [
        {"rank": 1, "keyword": "송다은 BTS 지민과", "state": "s"},
        {"rank": 2, "keyword": "HLB FDA 승인", "state": "s"},
        {"rank": 3, "keyword": "김호중", "state": "s"},
        {"rank": 4, "keyword": "파타야 살인 사건 용의자", "state": "s"},
        {"rank": 5, "keyword": "뉴진스 DITTO 6억", "state": "s"},
        {"rank": 6, "keyword": "이호진", "state": "s"},
        {"rank": 7, "keyword": "구혜선 재산 노숙", "state": "s"},
        {"rank": 8, "keyword": "우원식", "state": "s"},
        {"rank": 9, "keyword": "국민연금공단", "state": "s"},
        {"rank": 10, "keyword": "민희진 의결권 가처분", "state": "s"}
    ]
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
