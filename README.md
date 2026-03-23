# 📍 최적의 공공시설물 입지 찾기 서비스: Public Fit  

[![Language](https://img.shields.io/badge/Language-Python-blue)](https://www.python.org/)
[![Language](https://img.shields.io/badge/Language-JavaScript-yellow)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Framework](https://img.shields.io/badge/Framework-React-blueviolet)](https://reactjs.org/)
[![DBMS](https://img.shields.io/badge/DBMS-PostgreSQL-blue)](https://www.postgresql.org/)
[![ML](https://img.shields.io/badge/ML-XGBoost-orange)](https://xgboost.ai/)
[![ML](https://img.shields.io/badge/ML-DecisionTree-green)](https://scikit-learn.org/stable/modules/tree.html)

[![Data](https://img.shields.io/badge/Data-국토교통부%20100m%20격자-lightgrey)](https://www.nsdi.go.kr/lxportal/?menuno=2579)
[![Data](https://img.shields.io/badge/Data-공공어린이집-lightblue)](https://data.seoul.go.kr/dataList/OA-20300/S/1/datasetView.do)
[![Data](https://img.shields.io/badge/Data-전기차충전소-lightblue)](https://data.seoul.go.kr/dataList/OA-22249/F/1/datasetView.do)
[![Data](https://img.shields.io/badge/Data-공공도서관-lightblue)](https://www.data.go.kr/data/15013109/standard.do)
[![Data](https://img.shields.io/badge/Data-공공주차장-lightblue)](https://www.sisul.or.kr/open_content/main/govern30/open/list.jsp)


## 📖 Description

PublicFit는 공공시설(도서관, 유치원, 전기차 충전소, 주차장)의 최적 입지를 찾기 위한 머신러닝 기반 추천 서비스입니다.

전국 100m 격자 단위 공간 데이터를 활용하여 인구, 건축물, 교통 정보를 분석하고, 시설 이용 가능성을 예측하여 최적 후보지를 추천합니다.

추천 결과는 지도 기반 UI로 제공되어 정책 결정자나 지자체 담당자가 직관적으로 확인할 수 있습니다.


## ✨ Demo
#### 1. 공공시설물 현황 및 추천 결과
<img width="1005" height="620" alt="image" src="https://github.com/user-attachments/assets/ee428d80-0dfb-4e29-8651-1b8f6cc75d18" />

<img width="1007" height="620" alt="image" src="https://github.com/user-attachments/assets/c788939b-141e-4984-9e2d-85cc326b694b" />


#### 2. AI 보고서 기능
<img width="510" height="313" alt="image" src="https://github.com/user-attachments/assets/06e5ea08-e1a1-4d94-90a2-ea935c823819" />

<img width="544" height="472" alt="image" src="https://github.com/user-attachments/assets/3da2798a-ea05-42fa-8de8-f2e5d087dfd4" />



## ⭐ Main Feature
#### 지역과 공공시설물 선택 기능 
- 추천받길 원하는 지역의 지역과 공공시설물 선택 기능
- 공공시설물의 범위 선택 기능

#### 현재 공공시설물의 현황 시각화
- Google Map과 좌표 변환을 활용해 현재 선택한 공공시설물이 어느 지역에 있는지 시각화

#### 현지 공공시설물의 최적 입지 추천
- 모델이 추천해준 상위 10개의 지역을 Google Map에 시각화
- 1~5위는 마커에 순위를 나타내 우선적으로 노출

#### AI 보고서 기능
- Decision Tree에서 도출한 중요 변수로 추천 결과에 대한 근거 표시
- Chat GPT API를 활용한 AI 자동 보고서 기능
- PDF로 저장 가능

---

## 📊 데이터 수집 범위 및 전처리

#### 1. 전국 격자 통계 데이터
- **개요**: 전국 단위 격자별 통계 정보 포함  
- **출처**: [국토정보플랫폼](https://www.nsdi.go.kr/lxportal/?menuno=2579)  
- **격자 단위**: 100m, 250m, 500m, 1km  
- **주요 속성**: 건물 정보, 인구 정보, 토지 정보  

**데이터 정제**  
- 도 단위로 제공된 여러 `.shp` 파일을 Python `GeoPandas` 라이브러리로  
  100m 격자 기준 단일 CSV 파일로 정제


#### 2. 공공시설물 설치 현황 데이터
- **개요**: 실제 시설물 설치 현황(이름, 위치) 포함  
- **출처**: [공공데이터포털](https://www.data.go.kr/)  
- **예시**: 대전 타슈 총 261개소 정보  
- **주요 속성**: 시설물명, 설치 주소, 위도/경도, 설치 여부  

**데이터 정제**  
- Kakao 지도 API로 설치 주소를 위도·경도로 변환  
- 불필요한 컬럼 제거 및 설치 여부 추가

---

## 🧐 모델 학습 과정

#### 1. Decision Tree를 통한 중요 변수 15종 도출
<img width="786" height="380" alt="image" src="https://github.com/user-attachments/assets/9ab9ca95-ec59-42db-8ccf-1d7f11459eb5" />
<img width="742" height="395" alt="image" src="https://github.com/user-attachments/assets/7472f930-f2d2-4490-b2e0-4f98b4d44e40" />


#### 2. 모델 5가지를 비교 후 XGBoost 모델 선정
<img width="479" height="334" alt="image" src="https://github.com/user-attachments/assets/d23b7433-61d2-433a-8167-f70defd35da2" />

- 다섯 가지 분류 알고리즘 (Random Forest, Neural Network, KNN, XGBoost, Logistic Regression)을 비교한 결과



## ➕ 모델 관련 논문
https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE12288818

