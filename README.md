# 수상구조사 CBT

수상구조사 필기 문제를 웹에서 풀 수 있는 Next.js CBT 앱입니다.

## 준비물

- Node.js 20 이상
- npm

Node.js를 설치하면 npm도 같이 설치됩니다.

- Windows/macOS: [Node.js 공식 사이트](https://nodejs.org/)에서 LTS 버전 설치
- 설치 확인:

```bash
node -v
npm -v
```

## 처음 실행하기

### 1. 저장소 받기

```bash
git clone https://github.com/beyejin/korea-lifeguard-cbt.git
cd korea-lifeguard-cbt
```

Git이 없다면 GitHub 페이지에서 `Code` → `Download ZIP`으로 내려받은 뒤 압축을 풀어도 됩니다. 그 경우 터미널에서 압축을 푼 폴더로 이동하세요.

### 2. 패키지 설치

아래 명령은 반드시 프로젝트 폴더 안에서 실행해야 합니다. 터미널 경로가 `korea-lifeguard-cbt`인지 확인하세요.

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

개발 서버가 켜져 있는 동안만 접속할 수 있습니다. 터미널에 `Ready`가 표시되면 브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.

Windows PowerShell, Windows 명령 프롬프트, macOS 터미널 모두 같은 명령을 사용하면 됩니다.

## 다시 실행하기

한 번 `npm install`을 했다면 다음부터는 프로젝트 폴더로 이동한 뒤 이것만 실행하면 됩니다.

```bash
cd korea-lifeguard-cbt
npm run dev
```

폴더를 다른 위치에 두었다면 `cd` 뒤에는 본인 컴퓨터의 실제 폴더 경로를 넣으면 됩니다.

예시:

```bash
cd ~/Desktop/lifeguard_cbt/cbt-app
npm run dev
```

## 종료하기

개발 서버를 끄려면 `npm run dev`가 실행 중인 터미널에서 `Ctrl + C`를 누릅니다.

터미널 창을 닫거나 컴퓨터를 재시동해도 서버는 꺼집니다. 서버가 꺼지면 [http://localhost:3000](http://localhost:3000)은 더 이상 열리지 않습니다.

## 데이터

문제 데이터는 `public/questions.json`에 들어 있습니다. 이 파일이 저장소에 포함되어 있으면 다른 로컬 환경에서도 같은 문제로 실행됩니다.

## 기능

- 과목별 선택
- 전체 500문제 풀이
- 문제 순서 랜덤 출제
- 풀이 중 정답/오답 개수 표시
- 문제 번호 입력 후 바로 이동
- 선택 후 정답과 해설 표시

## 자주 막히는 경우

### `npm` 명령을 찾을 수 없다고 나올 때

Node.js가 설치되지 않았거나 터미널을 설치 전에 열어둔 상태일 수 있습니다. Node.js LTS 버전을 설치한 뒤 터미널을 새로 열고 다시 실행해보세요.

### `localhost:3000`이 열리지 않을 때

`npm run dev`를 실행한 터미널을 끄지 말고 그대로 둔 상태에서 브라우저를 열어야 합니다.

### 3000번 포트가 이미 사용 중이라고 나올 때

다른 개발 서버가 켜져 있을 수 있습니다. 터미널 안내에 따라 다른 포트를 사용하거나, 기존 서버를 종료한 뒤 다시 실행하세요.

Next.js가 아래처럼 PID를 알려주는 경우:

```text
Run kill 26841 to stop it.
```

macOS/Linux에서는 안내된 번호로 종료할 수 있습니다.

```bash
kill 26841
```

그래도 종료되지 않으면 강제 종료합니다.

```bash
kill -9 26841
```

Windows에서는 PowerShell에서 아래처럼 종료할 수 있습니다. 숫자는 터미널에 표시된 PID로 바꿔 입력하세요.

```powershell
Stop-Process -Id 26841
```
