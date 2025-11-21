```markdown
# Blaze Stream BCH 🚀

Blaze Stream BCH is a decentralized video streaming platform built on BitcoinCash, leveraging smart contracts and Cashtokens. It empowers creators to monetize content directly, enforces secure access control, and automates royalties and tipping — all in a **trustless, transparent environment.

---

## 🔹 Quick Demo Setup (Hackathon-Friendly)

1. Clone the repository
```bash
git clone https://github.com/KALYANI100/blaze-stream-bch.git
cd blaze-stream-bch
````

2. **Install root dependencies**

```bash
npm install
```

3. **Install backend dependencies**

```bash
cd Backend
npm install
```

4. **Configure environment variables**

* Update with your **Mainnet credentials**:

```env
DATABASE_URL=<your_neondb_connection_string>

B2_APPLICATION_KEY_ID=<your_b2_key_id>
B2_APPLICATION_KEY=<your_b2_application_key>
B2_BUCKET_ID=<your_b2_bucket_id>
B2_BUCKET_NAME=<your_b2_bucket_name>

JWT_SECRET=your_super_secure_secret_here
```

> ⚠️ Remove any regtest credentials and replace them with Mainnet details.

5. **Setup database**

```bash
npx prisma generate
npx prisma db push
```

6. **Update BCHRPC class with Mainnet**

```javascript
class BCHRPC {
  constructor(port = 8332, username = 'your_mainnet_user', password = 'your_mainnet_password') {
    this.port = port;
    this.auth = Buffer.from(`${username}:${password}`).toString('base64');
  }

  async call(method, params = []) {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({ jsonrpc: '1.0', id: 'bch_api', method, params });
      const options = {
        hostname: '127.0.0.1',
        port: this.port,
        path: '/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data),
          'Authorization': `Basic ${this.auth}`,
        },
      };
      const req = http.request(options, (res) => {
        let responseData = '';
        res.on('data', (chunk) => (responseData += chunk));
        res.on('end', () => {
          try {
            const result = JSON.parse(responseData);
            if (result.error) reject(new Error(result.error.message));
            else resolve(result.result);
          } catch (err) { reject(new Error(`JSON parse error: ${err.message}`)); }
        });
      });
      req.on('error', (err) => reject(err));
      req.write(data);
      req.end();
    });
  }
}

const rpc = new BCHRPC(8332, 'your_mainnet_user', 'your_mainnet_password');
```

---

## ▶️ Run the Project

### **Root folder**

```bash
npm run dev
```

### **Backend**

```bash
node server.js
```

Your backend server will connect to **BCH Mainnet** and be ready for content monetization, smart contract interactions, and token handling.

---

## 🛠 Tech Stack

* **Frontend:** React, TypeScript, Tailwind CSS
* **Backend:** Node.js, Express
* **Blockchain:** BitcoinCash Mainnet
* **Smart Contracts:** CashScript v0.12+, Cashtokens
* **Storage:** Backblaze B2 (optional IPFS for video hosting)

---

## 🔑 Features

* **Premium Access:** Viewers buy Cashtokens to unlock premium videos.
* **Royalty Split:** Revenue automatically shared among creators.
* **Subscription Model:** Time-limited access enforced by smart contracts.
* **Tip System:** Users can tip creators with automated verification.

---

## 💡 Value Proposition

* **Creators:** Direct payments, reduced fees, automated royalties.
* **Viewers:** Transparent, verifiable content access.
* **Ecosystem:** Demonstrates real-world utility of BCH smart contracts and Cashtokens.

---


```
