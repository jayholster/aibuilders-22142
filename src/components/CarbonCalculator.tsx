import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CalculatorInputs {
  scenario: string;
  people: number;
  promptsPerPerson: number;
  whPerPrompt: number;
  kgPerKwh: number;
  lPerKwh: number;
  whSearch: number;
  wWord: number;
  kgPerMile: number;
  kWhPerDayHouse: number;
  lPerBottle: number;
}

const CarbonCalculator = () => {
  const { toast } = useToast();
  const [inputs, setInputs] = useState<CalculatorInputs>({
    scenario: "custom",
    people: 1,
    promptsPerPerson: 100,
    whPerPrompt: 0.24,
    kgPerKwh: 0.373,
    lPerKwh: 1.9,
    whSearch: 0.30,
    wWord: 15,
    kgPerMile: 0.404,
    kWhPerDayHouse: 30,
    lPerBottle: 0.5
  });

  const [results, setResults] = useState({
    totalPrompts: 0,
    totalKwh: 0,
    totalCO2Kg: 0,
    totalWaterL: 0,
    searchesEq: 0,
    minutesWord: 0,
    milesCar: 0,
    houseDays: 0,
    bottles: 0
  });

  const fmt = (n: number, d = 2) => Number(n).toLocaleString(undefined, { maximumFractionDigits: d });

  const updateInput = (key: keyof CalculatorInputs, value: string | number) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const applyScenario = (scenario: string) => {
    updateInput('scenario', scenario);
    switch (scenario) {
      case 'one':
        updateInput('people', 1);
        break;
      case 'class':
        updateInput('people', 25);
        break;
      case 'up':
        updateInput('people', 48900);
        break;
      case 'psu_all':
        updateInput('people', 88000);
        break;
    }
    calculate();
  };

  const preset = (name: string) => {
    switch (name) {
      case 'light':
        updateInput('whPerPrompt', 0.24);
        break;
      case 'heavier':
        updateInput('whPerPrompt', 1.0);
        break;
      case 'lowWUE':
        updateInput('lPerKwh', 0.2);
        break;
      case 'highWUE':
        updateInput('lPerKwh', 4.0);
        break;
    }
    calculate();
  };

  const calculate = () => {
    const totalPrompts = inputs.people * inputs.promptsPerPerson;
    const totalWh = totalPrompts * inputs.whPerPrompt;
    const totalKwh = totalWh / 1000;
    const totalCO2Kg = totalKwh * inputs.kgPerKwh;
    const totalWaterL = totalKwh * inputs.lPerKwh;

    const searchesEq = inputs.whSearch > 0 ? totalWh / inputs.whSearch : 0;
    const minutesWord = inputs.wWord > 0 ? (totalWh / inputs.wWord) * 60 : 0;
    const milesCar = inputs.kgPerMile > 0 ? totalCO2Kg / inputs.kgPerMile : 0;
    const houseDays = inputs.kWhPerDayHouse > 0 ? totalKwh / inputs.kWhPerDayHouse : 0;
    const bottles = inputs.lPerBottle > 0 ? totalWaterL / inputs.lPerBottle : 0;

    setResults({
      totalPrompts,
      totalKwh,
      totalCO2Kg,
      totalWaterL,
      searchesEq,
      minutesWord,
      milesCar,
      houseDays,
      bottles
    });
  };

  const shareResults = async () => {
    const snapshot = [
      `${fmt(inputs.people, 0)} people × ${fmt(inputs.promptsPerPerson, 0)} prompts each = ${fmt(results.totalPrompts, 0)} prompts`,
      `${fmt(results.totalKwh, 3)} kWh ≈ ${fmt(results.totalCO2Kg, 3)} kg CO₂e • ≈ ${fmt(results.totalWaterL, 3)} liters water`,
      `= ${fmt(results.searchesEq, 0)} Google searches = ${fmt(results.minutesWord, 0)} minutes of writing`
    ].join("\n");
    
    try {
      await navigator.clipboard.writeText(snapshot);
      toast({
        title: "Copied!",
        description: "Results copied to clipboard"
      });
    } catch {
      toast({
        title: "Copy failed",
        description: "Please select and copy manually",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">1) Choose a scenario</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="scenario">Scenario</Label>
              <Select value={inputs.scenario} onValueChange={applyScenario}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="custom">Custom - Set your own values</SelectItem>
                  <SelectItem value="one">One person - Individual usage</SelectItem>
                  <SelectItem value="class">Class of 25 - Our course enrollment</SelectItem>
                  <SelectItem value="up">Penn State University Park - Main campus students</SelectItem>
                  <SelectItem value="psu_all">Penn State System - All campuses combined</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Scenario Description */}
              <div className="mt-2 p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  {inputs.scenario === 'custom' && "Create your own scenario by adjusting the values below."}
                  {inputs.scenario === 'one' && "Calculate environmental impact for individual AI usage patterns."}
                  {inputs.scenario === 'class' && "See the cumulative impact of our entire class using AI tools."}
                  {inputs.scenario === 'up' && "Explore what happens when all University Park students use AI regularly."}
                  {inputs.scenario === 'psu_all' && "Understand the massive scale of AI impact across the entire Penn State system."}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="people">People in scenario</Label>
                <Input 
                  id="people"
                  type="number" 
                  value={inputs.people}
                  onChange={(e) => updateInput('people', parseInt(e.target.value) || 0)}
                  min="1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prompts">Prompts per person: {inputs.promptsPerPerson}</Label>
                <input
                  id="prompts"
                  type="range"
                  min="0"
                  max="500"
                  step="10"
                  value={inputs.promptsPerPerson}
                  onChange={(e) => updateInput('promptsPerPerson', parseInt(e.target.value))}
                  className="w-full h-3 sm:h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  style={{ WebkitAppearance: 'none' }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="energy">Energy per prompt (Wh)</Label>
                <Input 
                  id="energy"
                  type="number" 
                  step="0.01"
                  value={inputs.whPerPrompt}
                  onChange={(e) => updateInput('whPerPrompt', parseFloat(e.target.value) || 0)}
                />
                <p className="text-xs text-muted-foreground">Gemini median text prompt ≈ 0.24 Wh</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="carbon">Grid carbon intensity (kg CO₂e / kWh)</Label>
                <Input 
                  id="carbon"
                  type="number" 
                  step="0.001"
                  value={inputs.kgPerKwh}
                  onChange={(e) => updateInput('kgPerKwh', parseFloat(e.target.value) || 0)}
                />
                <p className="text-xs text-muted-foreground">US average: 0.373</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="water">Data-center WUE (L/kWh)</Label>
                <Input 
                  id="water"
                  type="number" 
                  step="0.01"
                  value={inputs.lPerKwh}
                  onChange={(e) => updateInput('lPerKwh', parseFloat(e.target.value) || 0)}
                />
                <p className="text-xs text-muted-foreground">liters water / kWh</p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              Defaults from recent public metrics: 0.24 Wh/prompt (Gemini text inference), 
              national-average grid intensity (~0.373 kg CO₂e/kWh), and data‑center 
              water‑use effectiveness ~1.8–1.9 L/kWh.
            </p>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => preset('light')}>Light text (0.24 Wh)</Button>
              <Button variant="outline" size="sm" onClick={() => preset('heavier')}>Heavier (1.0 Wh)</Button>
              <Button variant="outline" size="sm" onClick={() => preset('lowWUE')}>Low WUE (0.2 L/kWh)</Button>
              <Button variant="outline" size="sm" onClick={() => preset('highWUE')}>High WUE (4.0 L/kWh)</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">2) Everyday comparisons</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label>Google Search energy (Wh/search)</Label>
                <Input 
                  type="number" 
                  step="0.01"
                  value={inputs.whSearch}
                  onChange={(e) => updateInput('whSearch', parseFloat(e.target.value) || 0)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Word processing power (watts)</Label>
                <Input 
                  type="number" 
                  value={inputs.wWord}
                  onChange={(e) => updateInput('wWord', parseInt(e.target.value) || 0)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Car emissions (kg CO₂e/mile)</Label>
                <Input 
                  type="number" 
                  step="0.001"
                  value={inputs.kgPerMile}
                  onChange={(e) => updateInput('kgPerMile', parseFloat(e.target.value) || 0)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Household use (kWh/day)</Label>
                <Input 
                  type="number" 
                  step="0.1"
                  value={inputs.kWhPerDayHouse}
                  onChange={(e) => updateInput('kWhPerDayHouse', parseFloat(e.target.value) || 0)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Water bottle size (L)</Label>
                <Input 
                  type="number" 
                  step="0.01"
                  value={inputs.lPerBottle}
                  onChange={(e) => updateInput('lPerBottle', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1">Calculate</Button>
              <Button variant="outline" onClick={shareResults}>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-2xl font-bold">
            {fmt(inputs.people, 0)} people × {fmt(inputs.promptsPerPerson, 0)} prompts each = {fmt(results.totalPrompts, 0)} prompts
          </div>
          
          <div className="space-y-2">
            <div className="text-3xl font-black">{fmt(results.totalKwh, 3)} kWh</div>
            <div className="text-lg">
              ≈ {fmt(results.totalCO2Kg, 3)} kg CO₂e • ≈ {fmt(results.totalWaterL, 3)} liters water
            </div>
            <div className="text-sm text-muted-foreground">
              based on {fmt(inputs.whPerPrompt, 2)} Wh/prompt, {fmt(inputs.kgPerKwh, 3)} kg CO₂e/kWh, {fmt(inputs.lPerKwh, 2)} L/kWh
            </div>
          </div>

          <div className="space-y-1">
            <div>= <strong>{fmt(results.searchesEq, 0)}</strong> Google searches (at {fmt(inputs.whSearch, 2)} Wh/search)</div>
            <div>= <strong>{fmt(results.minutesWord, 0)}</strong> minutes of writing in Word on a {fmt(inputs.wWord, 0)} W laptop</div>
            <div>= driving <strong>{fmt(results.milesCar, 2)}</strong> mile(s) in an average gasoline car</div>
            <div>= electricity used by a typical U.S. home for <strong>{fmt(results.houseDays, 2)}</strong> day(s)</div>
            <div>= <strong>{fmt(results.bottles, 0)}</strong> × {fmt(inputs.lPerBottle, 2)} L water bottles</div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="inline-block bg-muted px-3 py-1 rounded-full text-sm">{fmt(results.totalKwh, 3)} kWh</span>
            <span className="inline-block bg-muted px-3 py-1 rounded-full text-sm">{fmt(results.totalCO2Kg, 3)} kg CO₂e</span>
            <span className="inline-block bg-muted px-3 py-1 rounded-full text-sm">{fmt(results.totalWaterL, 3)} L</span>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm text-muted-foreground">
              <strong>Scope:</strong> This models <strong>inference</strong> energy/water/emissions. 
              Model training and embodied infrastructure are not included but matter at scale.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Assumptions & sources</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <ul className="list-disc list-inside space-y-1">
              <li><strong>0.24 Wh/prompt</strong> for basic text inference (Gemini median) → adjust for heavier prompts.</li>
              <li><strong>Grid intensity</strong> defaults to U.S. average (~0.373 kg CO₂e/kWh). Use a regional value if known.</li>
              <li><strong>WUE</strong> defaults ~1.8–1.9 L/kWh (sector average). Efficient sites can be ~0.2; water‑stressed sites higher.</li>
              <li><strong>Google search</strong> energy ~0.30 Wh/query (order of magnitude; varies with query type).</li>
              <li><strong>Word processing</strong> uses device power (default 15 W). Heavier laptops/desktops draw more.</li>
              <li><strong>Enrollment</strong>: University Park ~48,900; Penn State total ~88,000 (2024 snapshot).</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Scope & limitations</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p className="text-muted-foreground">
              <strong>Scope:</strong> This models <strong>inference</strong> energy/water/emissions. 
              Model training and embodied infrastructure are not included but matter at scale.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CarbonCalculator;