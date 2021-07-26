import { Validators } from "./FormWidget";

it("email validator works", () => {
  let validator = Validators.Email;
  runTests([
    { validator, input: "invalid", expected: false },
    { validator, input: "email@example.com", expected: true },
  ]);
});

it("pattern validator works", () => {
  let validator = Validators.Pattern(/^\d{4}$/);
  runTests([
    { validator, input: "2333", expected: true },
    { validator, input: "2sss", expected: false },
    { validator, input: "22", expected: false },
  ]);
});

it("required validator works", () => {
  let validator = Validators.Required;
  runTests([
    { validator, input: "", expected: false },
    { validator, input: undefined, expected: false },
    { validator, input: "good", expected: true },
  ]);
});

it("min validator works", () => {
  let validator = Validators.Min(3);
  runTests([
    { validator, input: "", expected: false },
    { validator, input: undefined, expected: false },
    { validator, input: "12", expected: false },
    { validator, input: "123", expected: true },
  ]);
});

it("max validator works", () => {
  let validator = Validators.Max(3);
  runTests([
    { validator, input: "", expected: true },
    { validator, input: undefined, expected: true },
    { validator, input: "123", expected: true },
    { validator, input: "1234", expected: false },
  ]);
});

/**
 *
 * @param {Array} tests
 */
function runTests(tests) {
  for (const test of tests) {
    expect(test.validator.call(test.validator, test.input)).toEqual(
      test.expected
    );
  }
}
