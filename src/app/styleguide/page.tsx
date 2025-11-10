"use client";

import { useState } from "react";
import { BackButton } from "@/components/atoms/BackButton";
import { Button } from "@/components/atoms/Button";
import { Heading } from "@/components/atoms/Heading";
import {
  AlertIcon,
  ChartIcon,
  CloseIcon,
  GridIcon,
  PaletteIcon,
  TableIcon,
  UsersIcon,
} from "@/components/atoms/Icon";
import { Input } from "@/components/atoms/Input";
import { Spinner } from "@/components/atoms/Spinner";
import { ErrorMessage } from "@/components/molecules/ErrorMessage";
import { SearchInput } from "@/components/molecules/SearchInput";
import { ViewMode } from "@/components/molecules/ViewMode";
import { CharacterGridView } from "@/components/organisms/CharacterGridView";
import { CharacterListView } from "@/components/organisms/CharacterListView";
import type { Character } from "@/types/character";
import type { ViewModeType } from "@/types/components";
import styles from "./page.module.css";

const sampleCharacters: Character[] = [
  {
    id: "1",
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: { name: "Earth (C-137)" },
    location: { name: "Citadel of Ricks" },
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  },
  {
    id: "2",
    name: "Morty Smith",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: { name: "unknown" },
    location: { name: "Citadel of Ricks" },
    image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
  },
  {
    id: "3",
    name: "Summer Smith",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Female",
    origin: { name: "Earth (Replacement Dimension)" },
    location: { name: "Earth (Replacement Dimension)" },
    image: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
  },
];

export default function StyleguidePage() {
  const [viewMode, setViewMode] = useState<ViewModeType>("table");

  return (
    <main className={styles.container}>
      <BackButton />

      <header className={styles.header}>
        <Heading>Design System Styleguide</Heading>
        <p className={styles.description}>
          A comprehensive showcase of design components and UI patterns used
          throughout the Alternative Payments application. This styleguide helps
          developers understand component usage, variants, and best practices.
        </p>
      </header>

      {/* Atomic Components */}
      <section className={styles.section}>
        <Heading level="h2" className={styles.sectionTitle}>
          Navigation Components
        </Heading>
        <p className={styles.sectionDescription}>
          Components for navigation and user interaction flows.
        </p>

        <div className={styles.componentExample}>
          <Heading level="h3" className={styles.exampleTitle}>
            Back Button
          </Heading>
          <p className={styles.exampleDescription}>
            Use for navigation back to previous pages. Supports custom href and
            label.
          </p>
          <div className={styles.exampleContainer}>
            <BackButton />
            <BackButton href="/" label="Home" />
          </div>
          <div className={styles.exampleCode}>
            {`<BackButton />
<BackButton href="/" label="Home" />`}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <Heading level="h2" className={styles.sectionTitle}>
          Button Component
        </Heading>
        <p className={styles.sectionDescription}>
          Primary interactive elements with different sizes and variants for
          various use cases.
        </p>

        <div className={styles.componentExample}>
          <Heading level="h3" className={styles.exampleTitle}>
            Button Sizes
          </Heading>
          <p className={styles.exampleDescription}>
            Available sizes: sm, md, lg, xl. Use larger sizes for primary
            actions.
          </p>
          <div className={styles.exampleContainer}>
            <Button variant="primary" size="xl">
              Extra Large
            </Button>
            <Button variant="primary" size="lg">
              Large
            </Button>
            <Button variant="primary" size="md">
              Medium
            </Button>
            <Button variant="primary" size="sm">
              Small
            </Button>
          </div>
          <div className={styles.exampleCode}>
            {`<Button variant="primary" size="xl">Extra Large</Button>
<Button variant="primary" size="lg">Large</Button>
<Button variant="primary" size="md">Medium</Button>
<Button variant="primary" size="sm">Small</Button>`}
          </div>
        </div>

        <div className={styles.componentExample}>
          <Heading level="h3" className={styles.exampleTitle}>
            Button Variants
          </Heading>
          <p className={styles.exampleDescription}>
            Primary for main actions, secondary for supporting actions, disabled
            for unavailable actions.
          </p>
          <div className={styles.exampleContainer}>
            <Button variant="primary" size="md">
              Primary
            </Button>
            <Button variant="secondary" size="md">
              Secondary
            </Button>
            <Button variant="primary" size="md" disabled>
              Disabled
            </Button>
          </div>
          <div className={styles.exampleCode}>
            {`<Button variant="primary" size="md">Primary</Button>
<Button variant="secondary" size="md">Secondary</Button>
<Button variant="primary" size="md" disabled>Disabled</Button>`}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <Heading level="h2" className={styles.sectionTitle}>
          Typography
        </Heading>
        <p className={styles.sectionDescription}>
          Heading components with semantic levels for proper content hierarchy.
        </p>

        <div className={styles.componentExample}>
          <Heading level="h3" className={styles.exampleTitle}>
            Heading Levels
          </Heading>
          <p className={styles.exampleDescription}>
            Use h1 for page titles, h2 for sections, h3 for subsections, and
            h4-h6 for smaller headings.
          </p>
          <div className={styles.exampleContainer}>
            <div>
              <Heading level="h1">Heading 1 - Page Title</Heading>
              <Heading level="h2">Heading 2 - Section</Heading>
              <Heading level="h3">Heading 3 - Subsection</Heading>
              <Heading level="h4">Heading 4 - Component</Heading>
              <Heading level="h5">Heading 5 - Detail</Heading>
              <Heading level="h6">Heading 6 - Small</Heading>
            </div>
          </div>
          <div className={styles.exampleCode}>
            {`<Heading level="h1">Heading 1 - Page Title</Heading>
<Heading level="h2">Heading 2 - Section</Heading>
<Heading level="h3">Heading 3 - Subsection</Heading>`}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <Heading level="h2" className={styles.sectionTitle}>
          Icons
        </Heading>
        <p className={styles.sectionDescription}>
          Consistent iconography with customizable size and accessibility
          support.
        </p>

        <div className={styles.iconGrid}>
          <div className={styles.iconExample}>
            <div className={styles.iconSizes}>
              <AlertIcon size={16} />
              <AlertIcon size={24} />
              <AlertIcon size={32} />
            </div>
            <span className={styles.iconName}>AlertIcon</span>
          </div>
          <div className={styles.iconExample}>
            <div className={styles.iconSizes}>
              <ChartIcon size={16} />
              <ChartIcon size={24} />
              <ChartIcon size={32} />
            </div>
            <span className={styles.iconName}>ChartIcon</span>
          </div>
          <div className={styles.iconExample}>
            <div className={styles.iconSizes}>
              <CloseIcon size={16} />
              <CloseIcon size={24} />
              <CloseIcon size={32} />
            </div>
            <span className={styles.iconName}>CloseIcon</span>
          </div>
          <div className={styles.iconExample}>
            <div className={styles.iconSizes}>
              <GridIcon size={16} />
              <GridIcon size={24} />
              <GridIcon size={32} />
            </div>
            <span className={styles.iconName}>GridIcon</span>
          </div>
          <div className={styles.iconExample}>
            <div className={styles.iconSizes}>
              <PaletteIcon size={16} />
              <PaletteIcon size={24} />
              <PaletteIcon size={32} />
            </div>
            <span className={styles.iconName}>PaletteIcon</span>
          </div>
          <div className={styles.iconExample}>
            <div className={styles.iconSizes}>
              <TableIcon size={16} />
              <TableIcon size={24} />
              <TableIcon size={32} />
            </div>
            <span className={styles.iconName}>TableIcon</span>
          </div>
          <div className={styles.iconExample}>
            <div className={styles.iconSizes}>
              <UsersIcon size={16} />
              <UsersIcon size={24} />
              <UsersIcon size={32} />
            </div>
            <span className={styles.iconName}>UsersIcon</span>
          </div>
        </div>

        <div className={styles.exampleCode}>
          {`<AlertIcon size={24} title="Custom accessibility title" />
<ChartIcon size={32} />
<UsersIcon size={16} />`}
        </div>
      </section>

      <section className={styles.section}>
        <Heading level="h2" className={styles.sectionTitle}>
          Form Components
        </Heading>
        <p className={styles.sectionDescription}>
          Input components for user data collection with various states and
          validation.
        </p>

        <div className={styles.componentExample}>
          <Heading level="h3" className={styles.exampleTitle}>
            Input Variations
          </Heading>
          <p className={styles.exampleDescription}>
            Default input for text entry, disabled state for read-only fields.
          </p>
          <div className={styles.exampleContainer}>
            <Input placeholder="Enter text here" />
            <Input placeholder="Disabled input" disabled />
          </div>
          <div className={styles.exampleCode}>
            {`<Input placeholder="Enter text here" />
<Input placeholder="Disabled input" disabled />`}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <Heading level="h2" className={styles.sectionTitle}>
          Loading States
        </Heading>
        <p className={styles.sectionDescription}>
          Spinner components to indicate loading states with different sizes.
        </p>

        <div className={styles.componentExample}>
          <Heading level="h3" className={styles.exampleTitle}>
            Spinner Sizes
          </Heading>
          <p className={styles.exampleDescription}>
            Use small for inline loading, medium for components, large for
            full-screen loading.
          </p>
          <div className={styles.exampleContainer}>
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
          </div>
          <div className={styles.exampleCode}>
            {`<Spinner size="sm" />
<Spinner size="md" />  
<Spinner size="lg" />`}
          </div>
        </div>
      </section>

      {/* Molecular Components */}
      <section className={styles.section}>
        <Heading level="h2" className={styles.sectionTitle}>
          Molecular Components
        </Heading>
        <p className={styles.sectionDescription}>
          Complex components built from atomic elements for specific use cases.
        </p>

        <div className={styles.componentExample}>
          <Heading level="h3" className={styles.exampleTitle}>
            Error Message
          </Heading>
          <p className={styles.exampleDescription}>
            Display error states with clear messaging and visual indicators.
          </p>
          <div className={styles.exampleContainer}>
            <ErrorMessage
              title="Validation Error"
              message="Please check your input and try again."
            />
          </div>
          <div className={styles.exampleCode}>
            {`<ErrorMessage 
  title="Validation Error" 
  message="Please check your input and try again." 
/>`}
          </div>
        </div>

        <div className={styles.componentExample}>
          <Heading level="h3" className={styles.exampleTitle}>
            Search Input
          </Heading>
          <p className={styles.exampleDescription}>
            Enhanced input with search functionality and clear button.
          </p>
          <div className={styles.exampleContainer}>
            <SearchInput />
          </div>
          <div className={styles.exampleCode}>{`<SearchInput />`}</div>
        </div>

        <div className={styles.componentExample}>
          <Heading level="h3" className={styles.exampleTitle}>
            View Mode Toggle
          </Heading>
          <p className={styles.exampleDescription}>
            Switch between different view modes (table, grid) for data
            presentation.
          </p>
          <div className={styles.exampleContainer}>
            <ViewMode
              value={viewMode}
              onChange={(newViewMode: ViewModeType) => setViewMode(newViewMode)}
            />
          </div>
          <div className={styles.exampleCode}>
            {`<ViewMode
  value={viewMode}
  onChange={(mode) => setViewMode(mode)}
/>`}
          </div>
        </div>
      </section>

      {/* Organism Components */}
      <section className={styles.section}>
        <Heading level="h2" className={styles.sectionTitle}>
          Data Presentation
        </Heading>
        <p className={styles.sectionDescription}>
          Complex components for displaying and organizing large amounts of
          data.
        </p>

        <div className={styles.componentShowcase}>
          <div className={styles.showcaseItem}>
            <div className={styles.showcaseTitle}>Character List View</div>
            <p className={styles.showcaseDescription}>
              Tabular display for detailed data with sorting and filtering
              capabilities.
            </p>
            <CharacterListView characters={sampleCharacters} />
          </div>

          <div className={styles.showcaseItem}>
            <div className={styles.showcaseTitle}>Character Grid View</div>
            <p className={styles.showcaseDescription}>
              Card-based layout for visual browsing with responsive grid system.
            </p>
            <CharacterGridView characters={sampleCharacters} />
          </div>
        </div>
      </section>
    </main>
  );
}
