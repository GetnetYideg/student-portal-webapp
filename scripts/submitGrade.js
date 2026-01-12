const data = {
    "A": [
        {id:"ETS0567/16", name:"Fahmi Rahmet"},
        {id:"ETS0544/16", name:"Selamawit Kebede"},
        {id:"ETS0891/15", name:"Yohannes Tadesse"},
        {id:"ETS0765/16", name:"Biruk Alemayehu"},
        {id:"ETS1123/16", name:"Hana Girma"}
    ],
    "B": [
        {id:"ETS0987/16", name:"Dawit Tesfaye"},
        {id:"ETS0654/16", name:"Meron Assefa"},
        {id:"ETS0772/16", name:"Abel Getachew"}
    ]
};

const sectionSelect = document.getElementById('section');
const gradeBody     = document.getElementById('gradeBody');
const saveBtn       = document.getElementById('saveBtn');
const success       = document.getElementById('successMsg');

function loadSection() {
    const sec = sectionSelect.value;
    const students = data[sec] || [];

    gradeBody.innerHTML = '';

    students.forEach((st, i) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${i+1}</td>
            <td>${st.id}</td>
            <td style="text-align:left; padding-left:18px;">${st.name}</td>
            <td class="editable" contenteditable="true" data-type="mid"   data-id="${st.id}" tabindex="0"></td>
            <td class="editable" contenteditable="true" data-type="assign" data-id="${st.id}" tabindex="0"></td>
            <td class="editable" contenteditable="true" data-type="final"  data-id="${st.id}" tabindex="0"></td>
            <td class="sum-cell" data-id="${st.id}">0</td>
            <td class="letter-cell" data-id="${st.id}">-</td>
        `;
        gradeBody.appendChild(tr);
    });
}

loadSection();
sectionSelect.onchange = loadSection;

gradeBody.addEventListener('input', e => {
    const cell = e.target;
    if (!cell.isContentEditable) return;

    let val = cell.textContent.trim().replace(/[^0-9.]/g, '');
    if (val === '') val = '';
    cell.textContent = val;

    updateRow(cell.parentElement);
});

gradeBody.addEventListener('keydown', e => {
    if (!e.target.isContentEditable) return;

    if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        moveNext(e.target, e.key === 'Tab' && e.shiftKey ? -1 : 1);
    }
    else if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) {
        e.preventDefault();
        moveArrow(e.target, e.key);
    }
});

function updateRow(tr) {
    const mid    = Number(tr.querySelector('[data-type="mid"]')?.textContent)   || 0;
    const assign = Number(tr.querySelector('[data-type="assign"]')?.textContent) || 0;
    const final  = Number(tr.querySelector('[data-type="final"]')?.textContent)  || 0;

    const sum    = (mid + assign + final).toFixed(0);
    const weighted = (mid*0.3 + assign*0.2 + final*0.5).toFixed(1);
    const letter = getLetter(sum);

    tr.querySelector('.sum-cell').textContent = sum;
    tr.querySelector('.letter-cell').textContent = letter;
    tr.querySelector('.letter-cell').className =
        `letter-cell ${letter.includes('A')?'letter-A':letter.includes('B')?'letter-B':letter.includes('C')?'letter-C':letter==='D'?'letter-D':'letter-F'}`;
}

function moveNext(cell, dir = 1) {
    const row = cell.parentElement;
    const editables = [...row.querySelectorAll('.editable')];
    const idx = editables.indexOf(cell);
    let nextIdx = idx + dir;

    if (nextIdx >= editables.length) {
        const nextRow = row.nextElementSibling;
        if (nextRow) nextRow.querySelector('.editable')?.focus();
    } else if (nextIdx < 0) {
        const prevRow = row.previousElementSibling;
        if (prevRow) {
            const prevCells = prevRow.querySelectorAll('.editable');
            prevCells[prevCells.length-1]?.focus();
        }
    } else {
        editables[nextIdx]?.focus();
    }
}

function moveArrow(cell, key) {
    const row = cell.parentElement;
    const tbody = row.parentElement;
    const rows = [...tbody.rows].slice(1);
    const rIdx = rows.indexOf(row);
    const cells = [...row.querySelectorAll('.editable')];
    const cIdx = cells.indexOf(cell);

    let nr = rIdx, nc = cIdx;

    if (key === 'ArrowRight') nc++;
    if (key === 'ArrowLeft')  nc--;
    if (key === 'ArrowDown')  nr++;
    if (key === 'ArrowUp')    nr--;

    if (nr >= 0 && nr < rows.length) {
        const targetRow = rows[nr];
        const targetCells = targetRow.querySelectorAll('.editable');
        if (nc >= 0 && nc < targetCells.length) {
            targetCells[nc].focus();
        }
    }
}

saveBtn.onclick = () => {
    success.style.display = 'block';
    setTimeout(() => success.style.display = 'none', 3400);
};

function getLetter(n) {
    n = parseFloat(n);
    if (n >= 90) return 'A+';
    if (n >= 85) return 'A';
    if (n >= 80) return 'A-';
    if (n >= 75) return 'B+';
    if (n >= 70) return 'B';
    if (n >= 65) return 'B-';
    if (n >= 60) return 'C+';
    if (n >= 50) return 'C';
    if (n >= 40) return 'D';
    return 'F';
}