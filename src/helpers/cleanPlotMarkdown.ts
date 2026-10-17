// Plot's source is VitePress Markdown. Keep examples as reference material,
// but remove the website UI and turn its custom containers into ordinary text.
export function cleanPlotMarkdown(content: string): string {
  const preserved: string[] = [];
  const keep = (value: string) => {
    preserved.push(value);
    return `\uE000PLOT${preserved.length - 1}\uE000`;
  };
  const lines = content.split("\n");
  const prose: string[] = [];
  for (let index = 0; index < lines.length; index++) {
    if (/^\s*<!--/.test(lines[index])) {
      const start = index;
      while (!lines[index].includes("-->") && index + 1 < lines.length) index++;
      prose.push(lines.slice(start, index + 1).join("\n"));
      continue;
    }
    const opening = lines[index].match(/^ {0,3}(`{3,}|~{3,})(.*)$/);
    if (!opening) {
      prose.push(lines[index]);
      continue;
    }
    const start = index;
    while (++index < lines.length) {
      const closing = lines[index].match(/^ {0,3}(`{3,}|~{3,})\s*$/);
      if (closing?.[1][0] === opening[1][0] && closing[1].length >= opening[1].length) break;
    }
    if (index >= lines.length) throw new Error("Unclosed Plot code fence.");
    const block = lines.slice(start, index + 1);
    if (opening[2].trim() === "js-vue") {
      block[0] = `${opening[1]}text`;
      prose.push(
        keep(
          "Interactive example template (values in `{{…}}` come from the upstream website):\n\n" +
            block.join("\n"),
        ),
      );
    } else {
      prose.push(keep(block.join("\n")));
    }
  }
  let result = prose
    .join("\n")
    .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/g, (_match: string, code: string) => {
      const fence = "`".repeat(
        Math.max(3, ...[...code.matchAll(/`+/g)].map((match) => match[0].length + 1)),
      );
      return keep(
        `**Upstream example setup.** This code may use Vue and sample data from the linked source page.\n\n${fence}js\n${code.trim()}\n${fence}`,
      );
    })
    .replace(/^[ \t]*<!--(?!\s*setup-data-project:)[\s\S]*?-->/gm, "")
    .replace(
      /<\/?[A-Za-z](?:"[^"]*"|'[^']*'|[^'"><])*>|(`+)[^`\n]*?\1/g,
      (part: string, fence: string | undefined) => (fence ? keep(part) : part),
    )
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, "")
    .replace(/<p\b[^>]*>([\s\S]*?)<\/p>/g, (_match: string, body: string) =>
      /<(?:input|select|label)\b/.test(body) ? "" : body,
    )
    .replace(/<PlotRender\b[\s\S]*?\/>/g, (component) => {
      const options = component.match(/:options=(["'])([\s\S]*?)\1/)?.[2];
      const method = component.match(/\bmethod=["'](\w+)["']/)?.[1] ?? "plot";
      if (!options) throw new Error("Unrecognized PlotRender example.");
      return keep(`\`\`\`js\nPlot.${method}(${options});\n\`\`\``);
    })
    .replace(/<VersionBadge\b[\s\S]*?\/>/g, (badge) => {
      const version = badge.match(/\bversion=["']([^"']+)["']/)?.[1];
      return version ? `(since v${version})` : "";
    })
    .replace(/<\/?span\b(?:"[^"]*"|'[^']*'|[^'">])*>/g, "")
    .replace(/<svg\b[\s\S]*?<\/svg>/g, "arrow");
  result = result
    .replace(/^[ \t]*:::plot\b([^\n]*)/gm, (_match: string, options: string) => {
      const url = options.match(/https?:\/\/\S+/)?.[0];
      return url ? `[Interactive example](${url})\n` : "";
    })
    .replace(
      /^([ \t]*):::(tip|info|warning)\b[ \t]*/gm,
      (_match: string, indent: string, kind: string) =>
        `${indent}**${kind[0].toUpperCase() + kind.slice(1)}:** `,
    )
    .replace(/^[ \t]*:::[ \t]*$/gm, "")
    .replace(/[ \t]+:::[ \t]*$/gm, "")
    .replace(
      /\{\{([\s\S]*?)\}\}/g,
      (_match: string, expression: string) => `\`${expression.trim().replace(/\s+/g, " ")}\``,
    )
    .replace(/[ \t]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return (
    result.replace(
      /\uE000PLOT(\d+)\uE000/g,
      (_match: string, index: string) => preserved[Number(index)],
    ) + "\n"
  );
}
