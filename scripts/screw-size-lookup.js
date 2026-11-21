(() => {
  const form = document.getElementById("size-lookup-form");
  const woodTable = document.getElementById("wood-gauge-table");
  const metricTable = document.getElementById("metric-thread-table");
  if (!form || !woodTable || !metricTable) return;

  const size = document.getElementById("lookup-size");
  const length = document.getElementById("lookup-length");
  const unit = document.getElementById("lookup-unit");
  const status = document.getElementById("lookup-status");
  const results = document.getElementById("lookup-results");
  const millimetresPerInch = 25.4;
  const formatter = new Intl.NumberFormat("en", {
    maximumSignificantDigits: 8,
    useGrouping: false
  });
  const references = new Map();

  function tableValues(table) {
    return Array.from(table.rows).slice(1).map((row) =>
      Array.from(row.cells, (cell) => cell.textContent.trim())
    );
  }

  function addOptions(label, entries) {
    const group = document.createElement("optgroup");
    group.label = label;
    for (const [designation, dimensions] of entries) {
      references.set(designation, { label, dimensions });
      group.append(new Option(designation, designation));
    }
    size.append(group);
  }

  addOptions("Wood screw gauge", tableValues(woodTable).map(([gauge, inches, mm]) => [
    gauge,
    [["Nominal diameter", `${mm} mm / ${inches} in.`]]
  ]));

  addOptions("Metric machine screw", tableValues(metricTable).map(([thread, coarse, fine, drill, clearance]) => {
    const mm = Number(thread.slice(1));
    const dimensions = [
      ["Nominal diameter", `${mm} mm / ${formatter.format(mm / millimetresPerInch)} in.`],
      ["Coarse thread pitch", `${coarse} mm`],
      ["Typical coarse tap drill", `${drill} mm`],
      ["Medium-fit clearance hole", `${clearance} mm`]
    ];
    if (fine !== "n/a") {
      dimensions.splice(2, 0, ["Fine thread pitch", fine.split(" / ").map((value) => `${value} mm`).join(" or ")]);
    }
    return [thread, dimensions];
  }));

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const reference = references.get(size.value);
    const dimensions = reference ? [...reference.dimensions] : [];
    results.replaceChildren();
    results.hidden = true;

    if (length.value) {
      const value = length.valueAsNumber;
      const mm = unit.value === "in" ? value * millimetresPerInch : value;
      const inches = unit.value === "in" ? value : value / millimetresPerInch;
      if (!Number.isFinite(mm) || !Number.isFinite(inches) || mm <= 0 || inches <= 0) {
        status.textContent = "Enter a positive length to convert it.";
        return;
      }
      dimensions.push(["Length", `${formatter.format(mm)} mm / ${formatter.format(inches)} in.`]);
    }

    if (dimensions.length === 0) {
      status.textContent = "Choose a screw size or enter a length.";
      return;
    }

    for (const [label, value] of dimensions) {
      const pair = document.createElement("div");
      const term = document.createElement("dt");
      const description = document.createElement("dd");
      term.textContent = label;
      description.textContent = value;
      pair.append(term, description);
      results.append(pair);
    }
    status.textContent = reference ? `${reference.label} ${size.value}` : "Length conversion";
    results.hidden = false;
  });

  form.hidden = false;
})();
