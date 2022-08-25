# 짝khu웅
## Description
- 개발기간 : 2022년 1학기 ~ 여름방학
- 프로젝트 소개
    - 경희대학교 선후배 멘토링 서비스 어플리케이션
    - 채팅, 게시판 서비스 제공
---
## Software architecture
![image](https://user-images.githubusercontent.com/56192209/186587539-60727a37-08da-4803-8f8f-0b92d28a391b.png) <br>
## E-R Diagram
![image](https://user-images.githubusercontent.com/56192209/186586905-ba191f88-b1a7-4fb9-8d86-39c5089b1e58.png)
## Flow Chart
![2](https://user-images.githubusercontent.com/56192209/186589396-cd79a440-dfc0-4bdc-b202-0f18c866481b.png)

---
## Getting Started / Installation
- BE : Spring (자바 11, gradle)
- FE : React Native (npm 8.15.0, react native 0.68.2)
1. DB 구축
```
winpty mysql -u root –p
mysql> create database db_khu;
mysql> create user 'user01'@'%' identified by '1234';
mysql> grant all on db_khu.* to 'user01'@'%';
```
2. 라이브러리 다운
```
npm installs 

// react navigation
npm install @react-navigation/native
npm install react-native-screens react-native-safe-area-context

//stack navigator
npm install @react-navigation/native-stack

//drawer navigator
npm install @react-navigation/drawer
npm install react-native-gesture-handler react-native-reanimated

//dropdown picker
npm i react-native-dropdown-picker
```