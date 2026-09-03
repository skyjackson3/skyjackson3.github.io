---
title: "Rebuilding the request queue"
kind: "case study"
org: "NM Early Childhood Education and Care Department"
when: "2023–2026"
weight: 1
blurb: "A five-person communications office was taking requests from every division of a 400-person department by email. I built the queue that replaced it, then moved it again when the department consolidated platforms."
outcome: "TODO — the number that proves it. Requests handled per month, turnaround time before and after, or the backlog that stopped existing."
---

## The problem

Requests arrived from every division of the department, in whatever form the requester preferred: an email, a hallway conversation, a forwarded thread with six people copied and no clear owner. There was no way to see what the office had been asked for, no way to say what was in progress, and no defensible answer when someone asked why their thing hadn't happened yet. A five-person office was absorbing the coordination cost of an entire department, invisibly.

## What I built

A thirty-column intake tracker in Smartsheet, with automated routing, tiered approvals, and a metrics dashboard. Every request from every division entered the same queue and got the same treatment: logged, routed to an owner, approved at the tier its risk warranted, and closed with a record.

The column count is the part that sounds excessive and isn't. Most of those fields exist because someone downstream needed to filter on them — division, request type, deadline, accessibility requirement, approval tier, current owner. A queue that can't be sliced is just a list.

## Then it moved

The department consolidated onto Freshservice as a single service platform, which meant the intake had to move again. Rather than hand IT a description and hope, I delivered the migration as a package: eight service catalog items, each with its request workflow, routing logic, and accessibility intake fields specified.

That was deliberate. A migration handed off as requirements becomes a negotiation; handed off as a working specification, it becomes a build ticket. The office kept its process instead of inheriting whatever the new platform defaulted to.
