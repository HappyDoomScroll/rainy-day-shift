(function(root) {
  'use strict';
  const openings = {
    steady: {
      label: 'Keep things moving',
      quote: 'I know it’s rough. Let’s get through this wave, then we’ll talk.',
      pose: 'guarded',
      reply: '“Right. Keep it moving.”',
      direction: 'Maya straightens her badge and turns toward the queue.',
      consequence: 'She stays at the guest information position. You still haven’t heard what she was trying to tell you.',
      repair: 'Maya, I cut you off earlier. What have people been told? Let’s clear this up together.',
      continue: 'Send the next difficult question to me. Keep the rest of the line moving, and we’ll talk later.'
    },
    listen: {
      label: 'Make room to listen',
      quote: 'You’re right. I jumped to instructions. What’s been hardest today?',
      pose: 'open',
      reply: '“It’s not the rain. People keep saying someone promised we’d reopen in twenty minutes. When I say I don’t know, I’m the one lying.”',
      direction: 'Maya lowers her voice. For the first time, she looks directly at you.',
      consequence: 'Now you know what she is carrying: conflicting messages, and the frustration that lands on her when they don’t come true.',
      repair: 'Let’s agree on one update we can both give. What would help you feel ready to take the next question?',
      continue: 'I’ll do the talking from here. You stay with the line.'
    },
    relief: {
      label: 'Offer immediate relief',
      quote: 'Let me take the guest questions. Take a minute, and we’ll check in.',
      pose: 'relieved',
      reply: '“Thanks. I need a minute.”',
      direction: 'Maya moves to the staff alcove behind you. You take over the guest information position.',
      consequence: 'She has a moment to reset. You’re now answering guest questions, and you haven’t yet heard her side of the story.',
      repair: 'Before you head back, what was happening out there? Let’s work out what you need for the next conversation.',
      continue: 'Feeling better? Great. I need you back on guest questions.'
    }
  };
  const endings = {
    'steady-repair': {
      title: 'You reopened the conversation.', pose: 'open',
      maya: '“People have been promised twenty minutes all afternoon. I need us to stop giving different answers.”',
      action: 'You acknowledge the mixed messages and agree on an update you can both give. Maya offers to take the next question, with you nearby.',
      dana: '“Understood. I’m checking who can cover a break. Keep me posted on what the queue needs.”',
      update: 'You tell Dana about the conflicting messages and request relief. At 4:20, you give the queue the update you promised.',
      evidence: 'Your first response closed the conversation. Naming that mistake gave Maya a reason to try again—and gave you information you were missing.',
      cost: 'The repair took another conversation. Earlier curiosity could have helped you prepare for Jordan’s question.',
      next: 'Stay nearby for the next guest question, and confirm whether relief is available.',
      example: '“I should have asked sooner. We’ll use the same update, and I’ll stay nearby for the next few questions. What else do I need to know?”'
    },
    'steady-continue': {
      title: 'The line is moving. The issue remains.', pose: 'guarded',
      maya: '“Okay. Do you want me to answer people, or send everyone to you?”',
      action: 'Maya follows your direction. When another guest challenges the reopening information, she looks to you.',
      dana: '“Thanks for the update. What support does your team need?”',
      update: 'You give the queue the promised 4:20 update. You can describe the guest questions to Dana, but you still haven’t asked Maya what support she needs.',
      evidence: 'You handled the immediate guest conversation. Maya’s question shows that she is still unsure what you expect her to handle.',
      cost: 'You deferred the promised conversation again. For now, difficult questions keep coming back to you.',
      next: 'Return to Maya, acknowledge the delay, and ask what has been making these conversations difficult.',
      example: '“I said we would talk, and I pushed it back again. What’s been happening in these conversations? Let’s work out a plan together.”'
    },
    'listen-repair': {
      title: 'You have a plan you can both use.', pose: 'relieved',
      maya: '“One message would help. And could you stay close for the next couple of questions?”',
      action: 'You agree. Maya tells the next guest there is no confirmed reopening time and when the next update will come. You remain beside her.',
      dana: '“That helps. I’m checking who can cover a break. Keep me posted.”',
      update: 'You tell Dana what guests have been hearing and request relief. At 4:20, you and Maya deliver the update you promised.',
      evidence: 'Maya named a specific problem, helped shape the response, and asked for the support she needed. You now have something concrete to follow through on.',
      cost: 'The conversation took attention while guests were waiting. It also gave you a clearer response when the conflicting information surfaced.',
      next: 'Keep the next update consistent, stay nearby as agreed, and confirm relief rather than assuming it will arrive.',
      example: '“I’ll stay beside you for the next two conversations. Then we’ll check in again. If the message changes, we’ll confirm it with each other first.”'
    },
    'listen-continue': {
      title: 'You listened. Then you took over.', pose: 'guarded',
      maya: '“Okay. I’ll send the questions to you.”',
      action: 'Guests now hear a consistent message from you. Maya steps back from the conversations and waits for your direction.',
      dana: '“Can you step away for a quick check-in, or do you need cover?”',
      update: 'You give the promised 4:20 update. You know the cause of Maya’s frustration, but covering every difficult conversation makes it harder to step away.',
      evidence: 'Asking uncovered the problem. Taking over solved the immediate messaging issue, but you haven’t agreed on how Maya can resume it with support.',
      cost: 'Temporary cover can help. Without a handoff, you become the person every difficult question needs.',
      next: 'Agree on the message and the support Maya wants, then plan how she will take the next conversation.',
      example: '“I took over before we made a plan. Let’s agree on the update. Would it help if you took the next question with me beside you?”'
    },
    'relief-repair': {
      title: 'The break became a starting point.', pose: 'relieved',
      maya: '“The minute helped. But it’s the different answers. People think I’m hiding something when I can’t give them a time.”',
      action: 'You agree on one message and a next update time. Maya returns to the guest information position, with you nearby for the next questions.',
      dana: '“Thanks. I’m checking who can provide longer cover. Let me know how the next update goes.”',
      update: 'You tell Dana why the guest conversations have been difficult and request relief. At 4:20, you and Maya give the queue the promised update.',
      evidence: 'Immediate relief gave Maya space. Following up helped you discover what a break alone could not resolve.',
      cost: 'Covering the position limited what else you could do for a few minutes. You still need a sustainable plan for relief.',
      next: 'Follow through on the agreed support and check whether longer cover is available.',
      example: '“Let’s use the same update, and I’ll stay nearby. After the next few questions, tell me whether that’s helping.”'
    },
    'relief-continue': {
      title: 'She had a pause. The problem came back.', pose: 'tired',
      maya: '“I’m back. But they’re still asking why everyone’s giving them a different time.”',
      action: 'Maya returns to the same uncertain conversations. You have helped her step away briefly, but haven’t discussed what needs to change.',
      dana: '“Thanks for checking in. What would help the team get through the next stretch?”',
      update: 'You give the promised 4:20 guest update. You can tell Dana that Maya had a short breather, but you still need to understand the support she needs next.',
      evidence: 'The pause offered immediate relief. Maya’s first comment on returning shows that the underlying issue is still there.',
      cost: 'You covered the position, but missed the follow-up that could have made returning easier.',
      next: 'Ask what has been happening in the guest conversations, then agree on a shared response.',
      example: '“I’m glad you had a minute. I also need to understand what you’re coming back to. What have guests been told, and how can I support you?”'
    }
  };
  const story={openings,endings};
  root.RainyStory=story;
  if(typeof module!=='undefined') module.exports=story;
})(typeof window!=='undefined'?window:globalThis);
