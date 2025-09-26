# Extreme Typing Game

たまたまエンジニア同士で雑談していたときの話の流れから着想したものです。

最近の子どもはタイピングゲームを小さい頃からやっていて、小学生でもめちゃくちゃタイピングが速い
タイピングゲームってヘボン式ローマ字じゃない物が多いから、ちゃんとヘボン式のやつ（"し"を "shi"って打つもの）作ってみたいよね
エンジニアの生産性って割とタイピングスピードに左右されるところ大きいよね
docker compose とか bundle exec rails c とかを打つ速さ結構重要
それぞれの話題は別の場所で交わされた雑談でした。ただ、これらを融合すると bundle exec rails c とかを打たせる鬼畜なタイピングゲーム ができあがります。

これがあると、「こんにちは、お元気ですか」を打つのが子どもより遅くても「bundle exec rails c」を子どもより速く打てるおとうさん/おかあさんカッコイイ！ってなるじゃないですか。そして、Kaigi on Rails の参加者には優しいおとうさん/おかあさんたちも多く参加されています。

また、ブース出展が終わってからも、新卒研修だったりアプリ開発トレーニング題材だったりでタイピングゲームを流用する機会はいくらでもありそうです。作っておしまい、とはならないことも判断材料として、今年はタイピングゲームにしようと決めました。

## 現在の実装状況

Nuxt 3 + Nuxt UI で作られた SPA として実装済みです。

### アプリケーション構成

#### 画面遷移フロー
1. **ランキング画面** (`/`) - サンプルランキング表示とチャレンジ開始ボタン
2. **名前入力画面** (`/name-input`) - プレイヤー名入力フォーム  
3. **ゲーム画面** (`/game`) - タイピングゲーム本体（30秒間）
4. **結果画面** (`/result`) - WPMと正確性の結果表示

#### ゲーム仕様
- **入力方式**: テキストボックスなし、キーボード直接入力
- **視覚フィードバック**: 
  - 入力済み文字: 緑色ハイライト
  - 現在位置: 黄色で点滅
  - 未入力: グレー表示
- **エラー処理**: 間違い入力時に爆発エフェクト + 画面振動、正解まで進行しない
- **問題データ**: エンジニア向けコマンドとコード（ハードコーディング）

#### 技術スタック
- **フレームワーク**: Nuxt 3.4.x
- **UI ライブラリ**: Nuxt UI 3.3.x
- **デプロイ設定**: SPA モード（静的サイト生成対応）
- **状態管理**: Vue 3 Composition API + LocalStorage

### 開発コマンド

```bash
# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build

# 静的サイト生成
npm run generate

# プレビュー
npm run preview
```

### 問題データ形式（将来的な拡張用）

```game_data.txt
RAILS_ENV=test bundle exec rails db:migrate
---
bundle exec rspec spec/requests/api/v1/users_spec.rb
---
RAILS_ENV=production bundle exec rails db:reset
---
class TweetsController < ApplicationController
  def index
    @tweets = Tweet.where(user: current_user).order(created_at: :desc).limit(30)
  end
end
---
class User < ActiveRecord::Base
  belongs_to :auth_credential
end
```
