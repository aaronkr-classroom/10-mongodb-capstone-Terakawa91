// seed.js
"use strict";

/**
 * Listing 15.9 (p. 224)
 * 새로운 데이터 생성
 */
// 모듈 가져오기
const mongoose = require("mongoose"),
    subscriber = require("./models/Subscriber");
const Subscriber = require("./models/Subscriber");

// 데이터베이스 연결 설정
mongoose.connect(
    "mongodb+srv://krissvector58:LdOReXBPN87fODa6@ut-node.0qoahfe.mongodb.net/?retryWrites=true&w=majority&appName=UT-Node/ut-node"
);
mongoose.connection;

// subscribers 배열 생성 (5개 이상)
var subscribers = [
  {
    name: "amane",
    email: "ak@holo.com",
    newsletter: true,
  },
  {
    name: "kanata",
    email: "asd@a.com",
    newsletter: false,
  },
  {
    name: "bread",
    email: "breadya@ta.com",
    newsletter: true,
  },
  {
    name: "dog",
    email: "dog@dog.com",
    newsletter: false,
  },
  {
    name: "wowooww",
    email: "wowow@wowow.com",
    newsletter: false,
  },
  {
    name: "ohmyzsh",
    email: "zsh@isbest.com",
    newsletter: true,
  },
];

// 기존 데이터 제거
/*
Subscriber
    .deleteMany({})
    .exec()
    .then(result => {
        console.log(`Deleted ${result.deletedCount} records.`)
    })
    .catch(error => {
        console.log(`Error: ${error.message}`);
    })
*/

var commands = [];

// 프라미스 생성을 위한 구독자 객체 루프
subscribers.forEach(s => {
    commands.push(
        Subscriber
        .create({
            name: s.name,
            email: s.email,
            newsletter: s.newsletter
        })
        .then(s => {
            console.log(`Created: ${s.name}`);
        })
    );
});

// 프라미스 생성 후 로깅 작업
Promise.all(commands)
    .then(r => {
        console.log(JSON.stringify(r, null, 2));
        mongoose.connection.close();
    })
    .catch(e => {
        console.log(e);
    });