import { useState } from "react";

const TerminalDemo = () => {
  const [activeTab, setActiveTab] = useState("encode");

  return (
    <div className="hero-visual">
      <div className="terminal-window">
        <div className="terminal-bar">
          <span className="dot dot-red"></span>
          <span className="dot dot-yellow"></span>
          <span className="dot dot-green"></span>

          <div className="terminal-tabs">
            <button
              className={`t-tab ${activeTab === "encode" ? "active" : ""}`}
              onClick={() => setActiveTab("encode")}
            >
              🔐 encode
            </button>

            <button
              className={`t-tab ${activeTab === "decode" ? "active" : ""}`}
              onClick={() => setActiveTab("decode")}
            >
              🔓 decode
            </button>
          </div>
        </div>

        {/* ENCODE TAB */}
        {activeTab === "encode" && (
          <div className="terminal-body">
            <span className="t-line">
              <span className="t-comment">
                # Hide your password inside an image
              </span>
            </span>

            <br />

            <span className="t-line">
              <span className="t-prompt">$</span>{" "}
              <span className="t-input">
                python stega.py encode \
              </span>
            </span>

            <span className="t-line">
              &nbsp;&nbsp;
              <span className="t-key">--output</span>{" "}
              <span className="t-val">output.png</span> \
            </span>

            <span className="t-line">
              &nbsp;&nbsp;
              <span className="t-key">--password</span>{" "}
              <span className="t-val">"mySecret123"</span>
            </span>

            <br />

            <span className="t-line">
              <span className="t-comment"># ✅ Output</span>
            </span>

            <span className="t-line">
              <span className="t-success">✓</span>{" "}
              <span className="t-muted">
                Encoded image saved →
              </span>{" "}
              <span className="t-str">output.png</span>
            </span>

            <span className="t-line">
              <span className="t-success">✓</span>{" "}
              <span className="t-muted">
                Secret key generated →
              </span>{" "}
              <span className="t-val">
                a3f92bc1-7d44-4e8a-b120
              </span>
            </span>

            <br />

            <span className="t-line">
              <span className="t-comment">
                # ⚠ Save this key — it's required to decode!
              </span>
            </span>

            <span className="t-line">
              <span className="t-muted">
                Image is yours. Key is stored in DB.
              </span>{" "}
              <span className="cursor"></span>
            </span>
          </div>
        )}

        {/* DECODE TAB */}
        {activeTab === "decode" && (
          <div className="terminal-body">
            <span className="t-line">
              <span className="t-comment">
                # Extract the hidden password from an image
              </span>
            </span>

            <br />

            <span className="t-line">
              <span className="t-prompt">$</span>{" "}
              <span className="t-input">
                python stega.py decode \
              </span>
            </span>

            <span className="t-line">
              &nbsp;&nbsp;
              <span className="t-key">--image</span>{" "}
              <span className="t-val">output.png</span> \
            </span>

            <span className="t-line">
              &nbsp;&nbsp;
              <span className="t-key">--key</span>{" "}
              <span className="t-val">YOUR_SECRET_KEY</span>
            </span>

            <br />

            <span className="t-line">
              <span className="t-comment"># ✅ Output</span>
            </span>

            <span className="t-line">
              <span className="t-success">✓</span>{" "}
              <span className="t-muted">
                Password decoded successfully →
              </span>{" "}
              <span className="t-val">"mySecret123"</span>
            </span>

            <br />

            <span className="t-line">
              <span className="t-muted">
                Both image + key required. No key = no access.
              </span>{" "}
              <span className="cursor"></span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TerminalDemo;