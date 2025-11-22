"use client";

import { useEffect, useMemo, useState } from "react";

const DEFAULT_PROMPT =
  'Candid editorial-style portrait photography of a fashionable adult Korean woman, gazing directly at the viewer, "Portrait of a bold young woman in a teal satin bomber jacket and intricate bold Canker-Blossom in white", black mini-skirt, and chunky sneakers. Emphasize her confident expression, slick hair, and neon metro tunnel background with reflective tiles. Highlight electric color palette, modern edge, soft cinematic lighting, 85mm lens, shallow depth of field, professional photography, high detail, 4k';

function buildPollinationsUrl(prompt: string, seed: number) {
  const params = new URLSearchParams({
    prompt,
    nologo: "true",
    width: "768",
    height: "1024",
    seed: String(seed)
  });
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(
    prompt
  )}?${params.toString()}`;
}

export default function HomePage() {
  const [prompt, setPrompt] = useState<string>(DEFAULT_PROMPT);
  const [seed, setSeed] = useState<number>(() =>
    Math.floor(Math.random() * 10_000_000)
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reloadKey, setReloadKey] = useState<number>(0);

  const imageUrl = useMemo(() => buildPollinationsUrl(prompt, seed), [prompt, seed]);

  useEffect(() => {
    setIsLoading(true);
  }, [reloadKey]);

  const regenerate = () => {
    setSeed(Math.floor(Math.random() * 10_000_000));
    setReloadKey((k) => k + 1);
  };

  return (
    <div className="container">
      <div className="header">
        <div>
          <div className="title">Editorial Portrait Generator</div>
          <div className="subtitle">
            Neon metro tunnel aesthetic with reflective tiles and electric palette.
          </div>
        </div>
        <button className="btn" onClick={regenerate} aria-label="Regenerate image">
          Regenerate
        </button>
      </div>

      <div className="card">
        <div className="controls">
          <div className="prompt">
            <input
              className="input"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your editorial portrait..."
              aria-label="Prompt"
            />
          </div>
          <button className="btn" onClick={regenerate}>
            Generate
          </button>
        </div>

        <div className="viewer">
          <div className="viewerInner">
            {isLoading && <div className="spinner" aria-label="Loading" />}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={reloadKey}
              className="img"
              src={imageUrl}
              alt="AI generated editorial portrait"
              onLoad={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
            />
          </div>
        </div>

        <div className="hint">
          Tip: Tweak details like lighting, lens, wardrobe, and background to refine the look.
        </div>
      </div>
    </div>
  );
}

