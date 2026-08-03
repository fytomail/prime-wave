import { useState, useEffect } from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { useParams, Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  BrainCircuit, FileText, Code2, ArrowLeft, ArrowRight, CheckCircle2, 
  Send, Sparkles, Save, BookOpen, KeyRound, Check 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ROADMAP_DATA, Topic, Module, Semester } from '@/lib/roadmap-data';
import { 
  isTopicCompleted, 
  completeTopicAction, 
  getTopicNotes, 
  saveTopicNotes, 
  getChatHistory, 
  sendChatMessage, 
  ChatMessage, 
  isTopicUnlocked 
} from '@/lib/roadmap-store';

export default function TopicLearning() {
  const { id } = useParams<{ id: string }>();
  const [_, setLocation] = useLocation();
  const { toast } = useToast();

  // Find topic in catalog
  let currentTopic: Topic | null = null;
  let currentModule: Module | null = null;
  let currentSemester: Semester | null = null;

  for (const s of ROADMAP_DATA) {
    for (const m of s.modules) {
      const found = m.topics.find(t => t.id === id || String(t.number) === id);
      if (found) {
        currentTopic = found;
        currentModule = m;
        currentSemester = s;
        break;
      }
    }
    if (currentTopic) break;
  }

  // Fallback to 1st topic if not found directly
  if (!currentTopic) {
    currentSemester = ROADMAP_DATA[0];
    currentModule = currentSemester.modules[0];
    currentTopic = currentModule.topics[0];
  }

  const topicId = currentTopic.id;
  const isCompleted = isTopicCompleted(topicId);

  // Notes state
  const [notesText, setNotesText] = useState('');
  const [isNotesSaved, setIsNotesSaved] = useState(false);

  // AI Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputQuestion, setInputQuestion] = useState('');

  useEffect(() => {
    setNotesText(getTopicNotes(topicId));
    setChatMessages(getChatHistory(topicId));
    setIsNotesSaved(false);
  }, [topicId]);

  const handleNotesChange = (val: string) => {
    setNotesText(val);
    saveTopicNotes(topicId, val);
    setIsNotesSaved(true);
    setTimeout(() => setIsNotesSaved(false), 2000);
  };

  const handleCompleteTopic = () => {
    const res = completeTopicAction(topicId);
    toast({
      title: "Topic Completed! 🎉",
      description: `Earned +${res.creditsEarned || 20} Credits! Next topic unlocked.`,
    });
    // Trigger window event
    window.dispatchEvent(new Event('roadmap-progress-updated'));
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuestion.trim()) return;

    const updated = sendChatMessage(topicId, inputQuestion.trim());
    setChatMessages(updated);
    setInputQuestion('');
  };

  // Find Prev / Next Topic
  const allTopicsInModule = currentModule ? currentModule.topics : [];
  const currentIndex = allTopicsInModule.findIndex(t => t.id === currentTopic?.id);
  const prevTopic = currentIndex > 0 ? allTopicsInModule[currentIndex - 1] : null;
  const nextTopic = currentIndex < allTopicsInModule.length - 1 ? allTopicsInModule[currentIndex + 1] : null;

  return (
    <SidebarLayout userType="student">
      {/* Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <Link href={`/semester/${currentSemester?.number || 1}`}>
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" /> Back to Semester {currentSemester?.number}
          </Button>
        </Link>

        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-xs">
            Module {currentModule?.number}: {currentModule?.title}
          </Badge>

          {isCompleted ? (
            <Badge variant="outline" className="text-green-600 border-green-600 bg-green-50 px-3 py-1 font-semibold">
              <CheckCircle2 className="w-4 h-4 mr-1.5" /> Completed (+20 CR)
            </Badge>
          ) : (
            <Button onClick={handleCompleteTopic} className="gap-2 bg-green-600 hover:bg-green-700 text-white font-medium shadow-sm">
              Mark as Complete <CheckCircle2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Main Content Area */}
        <div className="flex-1 w-full space-y-6">
          <div className="bg-background border rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                Topic {currentTopic.number} of {allTopicsInModule.length}
              </div>
              <h1 className="text-3xl sm:text-4xl font-display font-bold">{currentTopic.title}</h1>
              <p className="text-lg text-muted-foreground mt-2">{currentTopic.description}</p>
            </div>

            <hr />

            {/* Lesson Overview & Body Content */}
            <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/15 text-foreground">
                <h3 className="text-base font-bold text-primary mb-1 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> Lesson Overview
                </h3>
                <p className="text-sm leading-relaxed">{currentTopic.content.overview}</p>
              </div>

              {/* Key Takeaways List */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-foreground">Key Takeaways</h3>
                <ul className="space-y-2 text-sm text-foreground">
                  {currentTopic.content.keyTakeaways.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 bg-muted/30 p-3 rounded-lg border border-border">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Code Snippet Example if present */}
              {currentTopic.content.codeSnippet && (
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-primary" /> Practical Code Example
                  </h3>
                  <div className="bg-slate-950 rounded-xl p-4 font-mono text-sm text-slate-200 overflow-x-auto border border-slate-800 shadow-inner">
                    <pre><code>{currentTopic.content.codeSnippet}</code></pre>
                  </div>
                </div>
              )}

              {/* Key Terms */}
              <div className="space-y-3 pt-2">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-primary" /> Essential Key Terms
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {currentTopic.keyTerms.map((kt, i) => (
                    <div key={i} className="p-3 rounded-lg bg-card border border-border text-sm">
                      <div className="font-bold text-primary mb-0.5">{kt.term}</div>
                      <div className="text-xs text-muted-foreground">{kt.definition}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Topic Navigation Buttons */}
          <div className="flex justify-between items-center bg-card p-4 rounded-xl border border-border shadow-2xs">
            {prevTopic ? (
              <Link href={`/topic/${prevTopic.id}`}>
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="w-4 h-4" /> Prev: {prevTopic.title}
                </Button>
              </Link>
            ) : (
              <div></div>
            )}

            {nextTopic ? (
              <Link href={`/topic/${nextTopic.id}`}>
                <Button className="gap-2">
                  Next: {nextTopic.title} <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            ) : (
              <Link href={`/semester/${currentSemester?.number || 1}`}>
                <Button variant="default" className="gap-2">
                  Complete Module <CheckCircle2 className="w-4 h-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* AI Learning Tools & Notes Sidebar (Right Side) */}
        <div className="w-full lg:w-96 shrink-0 sticky top-4">
          <Card className="border-primary/20 shadow-md">
            <div className="p-4 border-b bg-primary/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shadow-xs">
                  <BrainCircuit className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary text-sm">AI Learning Assistant</h3>
                  <div className="text-[11px] text-muted-foreground">Ask AI & Take Topic Notes</div>
                </div>
              </div>
            </div>

            <CardContent className="p-0">
              <Tabs defaultValue="qa" className="w-full">
                <TabsList className="w-full justify-start rounded-none border-b bg-muted/30 h-auto p-0">
                  <TabsTrigger value="qa" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-background rounded-none py-2.5 px-4 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5 mr-1.5 text-primary" /> Ask AI
                  </TabsTrigger>
                  <TabsTrigger value="notes" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-background rounded-none py-2.5 px-4 text-xs font-semibold">
                    <FileText className="w-3.5 h-3.5 mr-1.5" /> Notes {isNotesSaved && <Check className="w-3 h-3 text-green-600 inline ml-1" />}
                  </TabsTrigger>
                  <TabsTrigger value="summary" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-background rounded-none py-2.5 px-4 text-xs font-semibold">
                    Summary
                  </TabsTrigger>
                </TabsList>

                {/* Ask AI Chat Tab */}
                <TabsContent value="qa" className="mt-0 flex flex-col h-[460px] p-4">
                  <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
                    {chatMessages.map(msg => (
                      <div 
                        key={msg.id} 
                        className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                      >
                        <div className={`p-3 rounded-xl max-w-[90%] whitespace-pre-wrap leading-relaxed ${
                          msg.sender === 'user' ? 
                          'bg-primary text-primary-foreground rounded-tr-none' : 
                          'bg-muted/80 text-foreground border border-border rounded-tl-none'
                        }`}>
                          {msg.text}
                        </div>
                        <span className="text-[10px] text-muted-foreground mt-1 px-1">{msg.timestamp}</span>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSendChat} className="mt-3 pt-3 border-t flex gap-2">
                    <Input 
                      type="text" 
                      placeholder="Ask AI a question about this topic..." 
                      value={inputQuestion}
                      onChange={e => setInputQuestion(e.target.value)}
                      className="text-xs h-9"
                    />
                    <Button type="submit" size="sm" className="h-9 px-3 shrink-0">
                      <Send className="w-3.5 h-3.5" />
                    </Button>
                  </form>
                </TabsContent>

                {/* Notes Tab */}
                <TabsContent value="notes" className="mt-0 p-4 h-[460px] flex flex-col">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-muted-foreground">Personal Notes (Auto-saved)</span>
                    {isNotesSaved && <span className="text-[11px] text-green-600 font-medium">Saved!</span>}
                  </div>
                  <textarea 
                    className="flex-1 w-full p-3 rounded-lg border border-input text-xs bg-background resize-none focus:outline-none focus:ring-1 focus:ring-primary leading-relaxed" 
                    placeholder="Type your personal study notes for this topic here..."
                    value={notesText}
                    onChange={e => handleNotesChange(e.target.value)}
                  ></textarea>
                </TabsContent>

                {/* Summary Tab */}
                <TabsContent value="summary" className="mt-0 p-4 h-[460px] overflow-y-auto space-y-4 text-xs">
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/15">
                    <span className="font-bold block text-primary mb-1">Topic Summary</span>
                    <p className="text-muted-foreground">{currentTopic.summary}</p>
                  </div>

                  <div className="space-y-2">
                    <span className="font-bold text-foreground block">Key Concepts Covered:</span>
                    {currentTopic.keyTerms.map((kt, i) => (
                      <div key={i} className="p-2.5 rounded bg-muted/50 border border-border">
                        <span className="font-semibold text-foreground block">{kt.term}</span>
                        <span className="text-muted-foreground">{kt.definition}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarLayout>
  );
}
