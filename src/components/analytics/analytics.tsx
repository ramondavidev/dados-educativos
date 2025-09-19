"use client";

import Script from "next/script";

export function Analytics() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `,
        }}
      />
    </>
  );
}

// Helper function to track events
export function trackEvent(
  eventName: string,
  parameters?: Record<string, any>
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, {
      event_category: "engagement",
      event_label: parameters?.tool_name || "unknown",
      ...parameters,
    });
  }
}

// Specific tracking functions
export function trackToolView(toolName: string) {
  trackEvent("tool_view", { tool_name: toolName });
}

export function trackToolSubmit(toolName: string, success = true) {
  trackEvent("tool_submit", {
    tool_name: toolName,
    success: success ? "true" : "false",
  });
}

export function trackCopyResult(toolName: string) {
  trackEvent("copy_result", { tool_name: toolName });
}

export function trackFAQToggle(question: string, toolName?: string) {
  trackEvent("faq_toggle", {
    question: question,
    tool_name: toolName || "general",
  });
}

export function trackRelatedClick(fromTool: string, toTool: string) {
  trackEvent("related_click", {
    from_tool: fromTool,
    to_tool: toTool,
  });
}

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: object) => void;
  }
}
