import React, { useState } from "react";
import { Key, FileJson, Save, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";

const OWNER = "barrymasjiduk";
const REPO = "barrymasjiduk.github.io";
const FILE_PATH = "frontend/src/assets/data.json";

export default function AdminEditor() {
  const [token, setToken] = useState("");
  const [branch, setBranch] = useState("main");
  const [jsonText, setJsonText] = useState("");
  const [sha, setSha] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadFile() {
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}?ref=${branch}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to load file");
      }
      
      const data = await res.json();
      setSha(data.sha);
      setJsonText(atob(data.content));
      setLoaded(true);
      setSuccess("File loaded successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (e) {
      setError(`Failed to load file: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function saveFile() {
    setSaving(true);
    setError("");
    try {
      const encoded = btoa(jsonText);
      const res = await fetch(
        `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: "Update data.json via admin UI",
            content: encoded,
            sha: sha,
            branch: branch,
          }),
        }
      );
      
      if (res.ok) {
        const data = await res.json();
        setSha(data.content.sha);
        setSuccess("Changes saved successfully!");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || "Save failed");
      }
    } catch (e) {
      setError(`Failed to save changes: ${e.message}`);
    } finally {
      setSaving(false);
    }
  }

  function handleTokenSave() {
    if (!token.trim()) {
      setError("Please enter a valid token");
      return;
    }
    loadFile();
  }

  function clearToken() {
    setToken("");
    setLoaded(false);
    setJsonText("");
    setSha("");
    setError("");
    setSuccess("");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10">
            <FileJson className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Admin JSON Editor</h1>
          <p className="text-muted-foreground">Manage your GitHub repository data</p>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-lg bg-destructive/10 border border-destructive/20 p-4 text-destructive animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 flex items-center gap-3 rounded-lg bg-primary/10 border border-primary/20 p-4 text-primary animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-medium">{success}</p>
          </div>
        )}

        {/* Token Input Section */}
        {!loaded && (
          <div className="bg-card border border-border rounded-xl p-8 shadow-lg backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Key className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-card-foreground">Authentication Required</h2>
                <p className="text-sm text-muted-foreground">Enter your GitHub Personal Access Token</p>
              </div>
            </div>
            
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-foreground placeholder:text-muted-foreground"
            />
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Branch
              </label>
              <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                placeholder="main"
                className="w-full px-4 py-3 rounded-lg bg-input border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-foreground placeholder:text-muted-foreground"
              />
            </div>
            
            <button
              onClick={handleTokenSave}
              disabled={!token || loading}
              className="mt-6 w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Key className="w-5 h-5" />
                  Load File
                </>
              )}
            </button>
            
            <p className="mt-4 text-xs text-muted-foreground text-center">
              Repository: {OWNER}/{REPO}
            </p>
          </div>
        )}

        {/* Editor Section */}
        {loaded && (
          <div className="bg-card border border-border rounded-xl shadow-lg backdrop-blur-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-muted/50 border-b border-border px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <FileJson className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-card-foreground">Edit JSON</h2>
                  <p className="text-xs text-muted-foreground">{FILE_PATH}</p>
                </div>
              </div>
              <button
                onClick={clearToken}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Change Token
              </button>
            </div>
            
            <div className="p-6">
              <textarea
                className="w-full h-96 p-4 font-mono text-sm rounded-lg bg-black border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-foreground resize-none"
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                spellCheck={false}
              />
              
              <div className="mt-6 flex gap-3">
                <button
                  onClick={saveFile}
                  disabled={saving}
                  className="flex-1 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Save Changes
                    </>
                  )}
                </button>
                
                <button
                  onClick={loadFile}
                  disabled={loading}
                  className="px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                  Reload
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}