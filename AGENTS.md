<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- AI calls go through one streaming server route (`/api/ai`) with per-tool system prompts in `src/lib/ai/ai.server.ts`; why: keeps keys/prompts server-side and one place to tune prompts.
- Salon demo data lives in `src/lib/salon-data.ts` (no database yet); why: user skipped login/storage choices.
