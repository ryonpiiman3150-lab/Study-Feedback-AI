# TeachBack AI

> Explain it. Find the gaps in your understanding.

TeachBack AI is a learning support tool that helps learners identify gaps in their understanding by explaining a problem to AI, rather than asking AI to provide the answer.

Conventional question-answering AI can provide answers quickly, but learners may mistakenly feel that they understand a topic simply because they have read the answer. This project asks learners to explain how to solve a problem in their own words and visualizes missing conditions, reasoning, and conclusions.

## The Problem This Project Solves

Simply reading an answer or explanation does not clearly show how much a learner can explain independently. As a result, they may continue studying while their understanding remains unclear.

With TeachBack AI, learners explain a problem in their own words. Parts they cannot explain and missing assumptions are treated as review points, helping learners move from "I do not know what I do not understand" to a clear next step.

## Key Features

### 1. Keeps Learners Actively Involved

Instead of displaying an answer and stopping there, TeachBack AI asks learners to explain the solution themselves. Parts where the explanation stops or the reasoning cannot be put into words become the next review points.

### 2. Designs the Next Step After Feedback

The feedback shows not only what the learner understands, but also unclear points, what to focus on next, and specific study methods. Learners do not stop at "I do not understand"; they can see what to do next.

### 3. Adapts to How Each Subject Is Learned

The key points of a good explanation differ by subject. TeachBack AI switches the feedback criteria for each subject.

| Subject | Points to Check | UI Color |
| --- | --- | --- |
| Japanese | Textual evidence and interpretation | Red |
| Mathematics | Conditions, formulas, and equation transformations | Blue |
| Science | Causes, conditions, and results | Green |
| Social Studies | Background, causes, and effects | Yellow |
| English | Subjects, verbs, and sentence structure | Pink |

The UI color also changes when a subject is selected, making the current study mode visually clear.

### 4. Turns the Idea Into a Usable Experience

The app runs entirely in a browser and requires no installation. It includes a learning flow with separate input and feedback screens, input checks, an understanding score, an understanding map, evidence keywords, and a study plan.

A reusable prompt is also included so that the same learning support behavior can be tested with ChatGPT.

## How to Use

1. Select a subject and a feedback style.
2. Enter the problem and your own explanation.
3. Click `入力する` (`Submit`).
4. Review the understanding score, understanding map, points you understand, unclear points, what to focus on next, and study methods.
5. If needed, click `入力に戻る` (`Back to Input`) and revise your explanation.

## Implemented Features

- Theme colors that change depending on the selected subject
- Subject-specific feedback criteria
- An `解説の型` (`Explanation Template`) feature that helps learners start writing
- Input checks for the problem, conditions, reasoning, and conclusion
- Error messages and input focus when required fields are empty
- Understanding score and understanding map
- Keywords used as evidence for feedback
- A study plan showing what to work on next
- Responsive layouts for PCs, tablets, and smartphones
- Offline use without an internet connection

## How It Works and Its Current Scope

The current web app is a rule-based prototype that does not use a generative AI API or an external server. JavaScript in the browser analyzes whether the learner's explanation includes conditions, reasoning, conclusions, and important keywords, then generates subject-specific feedback.

The entered content is not sent outside the browser. The app therefore works without an internet connection.

This prototype focuses on turning the learning support AI experience into something that can be tested interactively. It is not a completed web app with generative AI directly integrated, but it allows the learning flow and feedback screens to be tested without using an API.

## ChatGPT Version

To test the same learning support concept with actual generative AI, this project also includes [CHATGPT_SKILL_PROMPT.md](./CHATGPT_SKILL_PROMPT.md).

When this prompt is configured in ChatGPT or a similar tool, the AI can act as a learning coach: it receives the learner's explanation and returns what the learner understands, unclear points, incorrect assumptions, what to focus on next, and specific study methods.

The web app version demonstrates the screen-based learning experience, while the prompt version demonstrates flexible feedback powered by generative AI.

## Tech Stack

- HTML
- CSS
- JavaScript

No frameworks or external libraries are used.

## Getting Started

1. Download or copy this folder.
2. Open `index.html` in a browser.

No installation or server startup is required. The app can also be used on another computer by copying the entire `study-feedback-ai` folder.

## Future Improvements

- Saving learning history for later review
- Uploading images of problems
- Improving subject-specific evaluation accuracy
